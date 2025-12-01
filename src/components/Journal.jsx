import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { PdfPreviewIframe } from "./PdfPreviewIframe";
import { AccountCard } from '../components/AccountCard';
import { TotalesDisplay } from '../components/TotalesDisplay';

export function Journal({ lines = [], header = {}, flatten = true, cuentaSeleccionada = null, totalDebe = 0, totalHaber = 0 }) {
  const [previewBlob, setPreviewBlob] = useState(null);
  const templateRef = useRef(null);
  const lastUrlRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (!templateRef.current) {
        const r = await fetch("/rayado-diario.pdf");
        templateRef.current = await r.arrayBuffer();
      }
      await regenPreview(lines);
    })();

    return () => {
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => regenPreview(lines), 150);
    return () => clearTimeout(t);
  }, [lines, header, flatten, totalDebe, totalHaber]);

  async function regenPreview(currentLines) {
    if (!templateRef.current) return;
    try {
      const bytes = await fillTemplateWithForm(
        templateRef.current, 
        { header, lines: currentLines, totalDebe, totalHaber },
        { flatten }
      );
      const blob = new Blob([bytes], { type: "application/pdf" });
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current);
      lastUrlRef.current = URL.createObjectURL(blob);
      setPreviewBlob(blob);
    } catch (e) {
      console.error("Error generando preview:", e);
    }
  }

  async function fillTemplateWithForm(templateArrayBuffer, data, options = { flatten: true }) {
    const pdfDoc = await PDFDocument.load(templateArrayBuffer);
    const form = pdfDoc.getForm();

    const fields = form.getFields();
    const fieldMap = {};
    fields.forEach(f => {
      try { fieldMap[f.getName()] = f; } catch(e){}
    });

    // Llenar folio
    const folioCandidates = ["folio", "FOLIO", "Folio", "folio_no", "folioNo"];
    for (const name of folioCandidates) {
      if (fieldMap[name] && typeof fieldMap[name].setText === "function" && data.header?.folio) {
        try { fieldMap[name].setText(String(data.header.folio)); break; } catch(e){}
      }
    }

    // Llenar líneas
    const prefixes = { fecha: "fecha_", concepto: "concepto_", parcial: "parcial_", debe: "debe_", haber: "haber_" };

    for (let i = 0; i < (data.lines || []).length; i++) {
      const idx = i + 1;
      const ln = data.lines[i] || {};

      for (const [key, prefix] of Object.entries(prefixes)) {
        const fname = `${prefix}${idx}`;
        const value = (ln[key] == null) ? "" : String(ln[key]);

        if (fieldMap[fname] && typeof fieldMap[fname].setText === "function") {
          try { fieldMap[fname].setText(value); continue; } catch(e){}
        }

        const alt = `${key}${idx}`;
        if (fieldMap[alt] && typeof fieldMap[alt].setText === "function") {
          try { fieldMap[alt].setText(value); }
          catch(e){}
        }
      }
    }

    // Llenar totales
    const totalDebeCandidates = ["total_debe", "totalDebe", "TOTAL_DEBE", "Total_Debe", "total debe", "TotalDebe"];
    const totalHaberCandidates = ["total_haber", "totalHaber", "TOTAL_HABER", "Total_Haber", "total haber", "TotalHaber"];

    for (const name of totalDebeCandidates) {
      if (fieldMap[name] && typeof fieldMap[name].setText === "function") {
        try { 
          fieldMap[name].setText(String(data.totalDebe || "0.00")); 
          console.log(`✅ Campo ${name} llenado con: ${data.totalDebe}`);
          break; 
        } catch(e) {
          console.warn(`Error al llenar ${name}:`, e);
        }
      }
    }

    for (const name of totalHaberCandidates) {
      if (fieldMap[name] && typeof fieldMap[name].setText === "function") {
        try { 
          fieldMap[name].setText(String(data.totalHaber || "0.00")); 
          console.log(`✅ Campo ${name} llenado con: ${data.totalHaber}`);
          break; 
        } catch(e) {
          console.warn(`Error al llenar ${name}:`, e);
        }
      }
    }

    // Debugging
    console.log("📋 Campos disponibles en el PDF:", fields.map(f => {
      try { return f.getName(); } catch(e) { return null; }
    }).filter(Boolean));

    if (options.flatten) {
      try { form.flatten(); } catch(e) { console.warn("flatten error", e); }
    }

    const out = await pdfDoc.save();
    return out;
  }

  // Validación: totales deben coincidir
  const debe = Number(totalDebe) || 0;
  const haber = Number(totalHaber) || 0;
  const totalesCoinciden = debe === haber;
  const puedeDescargar = totalesCoinciden && debe > 0;

  const handleDescargar = () => {
    if (!puedeDescargar) {
      alert("No se puede descargar: Los totales de Debe y Haber deben coincidir y ser mayores a 0.");
      return;
    }
    if (previewBlob) { 
      const a = document.createElement("a"); 
      a.href = URL.createObjectURL(previewBlob); 
      a.download = "rayado-diario-llenado.pdf"; 
      a.click(); 
    }
  };

  return (
    <>
      <div id="rayado">
        <PdfPreviewIframe file={previewBlob || "/rayado-diario.pdf"} />
      </div>

      <div id="tarjeta-enviar">
        <AccountCard>
          {cuentaSeleccionada ? (
            <p className="info-texto">
              <strong>{cuentaSeleccionada.nombre}</strong> ({cuentaSeleccionada.tipo} {cuentaSeleccionada.subtipo}): {cuentaSeleccionada.descripcion} Es una cuenta de naturaleza {cuentaSeleccionada.naturaleza.toLowerCase()}.
            </p>
          ) : (
            <p className="info-texto">
              "Aquí va la información de la cuenta que se está seleccionando."
            </p>
          )}
        </AccountCard>

        <div id="descarga-section">
          <TotalesDisplay totalDebe={totalDebe} totalHaber={totalHaber} />
          <button 
            onClick={handleDescargar}
            disabled={!puedeDescargar}
            className={!puedeDescargar ? 'btn-disabled' : ''}
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </>
  );
}
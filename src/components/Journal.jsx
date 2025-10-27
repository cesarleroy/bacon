import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { PdfPreviewIframe } from "./PdfPreviewIframe";

export function Journal({ lines = [], header = {}, flatten = true }) {
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
  }, [lines, header, flatten]);

  async function regenPreview(currentLines) {
    if (!templateRef.current) return;
    try {
      const bytes = await fillTemplateWithForm(templateRef.current, { header, lines: currentLines }, { flatten });
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

    const folioCandidates = ["folio", "FOLIO", "Folio", "folio_no", "folioNo"];
    for (const name of folioCandidates) {
      if (fieldMap[name] && typeof fieldMap[name].setText === "function" && data.header?.folio) {
        try { fieldMap[name].setText(String(data.header.folio)); break; } catch(e){}
      }
    }

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

    if (options.flatten) {
      try { form.flatten(); } catch(e) { console.warn("flatten error", e); }
    }

    const out = await pdfDoc.save();
    return out;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ height: "calc(100% - 40px)", border: "1px solid #ddd" }}>
        <PdfPreviewIframe file={previewBlob || "/rayado-diario.pdf"} />
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => { if (previewBlob) { const a = document.createElement("a"); a.href = URL.createObjectURL(previewBlob); a.download = "rayado-diario-llenado.pdf"; a.click(); }}}>Descargar PDF</button>
      </div>
    </div>
  );
}

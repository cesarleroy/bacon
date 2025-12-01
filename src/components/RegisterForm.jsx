import { useMemo, useEffect, useState, useRef } from "react";
import { FormField } from './FormField'
import { SelectBox } from './SelectBox';
import EntryTypeModal from './EntryTypeModal';

const tipos =  ["Activo", "Pasivo", "Capital"]
const activos =  ["Bancos", "Clientes", "Inventario", "Docs por cobrar",
  "Mobiliario y equipo", "Equipo de cómputo", "Terrenos"]
const pasivos = ["Docs por pagar", "Acreedores", "Proveedores"]
const capital = ["Capital social", "Resultados anteriores"]

export function RegisterForm({ onRegister, onCuentaChange, onUpdateTotal }) {
  const [tipoSeleccionado, setTipo] = useState("");
  const [cuentaSeleccionada, setCuenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(""); 

  const formRef = useRef(null);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entryType, setEntryType] = useState(null); // 'debe' | 'haber'

  const cuentasFiltradas = useMemo(() => {
    switch (tipoSeleccionado) {
      case 'Activo': return activos;
      case 'Pasivo': return pasivos;
      case 'Capital': return capital;
      default: return [...activos, ...pasivos, ...capital];
    }
  }, [tipoSeleccionado]);

  useEffect(() => {
    if (cuentaSeleccionada && !cuentasFiltradas.includes(cuentaSeleccionada)) {
      setCuenta("");
    }
  }, [tipoSeleccionado, cuentaSeleccionada, cuentasFiltradas]);

  const handleSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!tipoSeleccionado) return alert("Selecciona un tipo");
    if (!cuentaSeleccionada) return alert("Selecciona una cuenta");
    if (!cantidad) return alert("Ingresa una cantidad");

    // Decide debe/haber según entryType
    const line = {
      fecha: fecha || new Date().toLocaleDateString('de-DE'),
      concepto: `${tipoSeleccionado} - ${cuentaSeleccionada}`,
      debe: entryType === 'debe' ? cantidad : "",
      haber: entryType === 'haber' ? cantidad : ""
    };

    if (typeof onRegister === "function") onRegister(line);

    // Actualiza los totales
    if (typeof onUpdateTotal === "function") {
      onUpdateTotal(entryType === 'debe' ? cantidad : 0, entryType === 'haber' ? cantidad : 0);
    }

    // reset
    setCantidad("");
    setEntryType(null);
  }

  const onRegisterClick = (e) => {
    e && e.preventDefault && e.preventDefault();
    setShowEntryModal(true);
  };

  const handleConfirm = (type) => {
    setShowEntryModal(false);
    setEntryType(type);

    // submit programáticamente para disparar handleSubmit y usar entryType
    if (formRef.current && typeof formRef.current.requestSubmit === 'function') {
      setTimeout(() => formRef.current.requestSubmit(), 0);
    } else if (formRef.current) {
      setTimeout(() => {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }, 0);
    } else {
      handleSubmit();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h5>Registrar Cuenta</h5>
      <FormField label="Seleccionar cuenta (Concepto)">
        <div id="seleccion" >
          <SelectBox id="tipos" selected="Tipo" options={tipos} onChange={(v) => setTipo(v)} />
          <SelectBox
            id="cuentas"
            selected="Cuenta"
            options={cuentasFiltradas}
            onChange={(v) => {
              setCuenta(v);
              if (typeof onCuentaChange === "function") onCuentaChange(v);
            }}
          />
        </div>
      </FormField>

      <FormField label="Fecha (opcional)">
        <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" />
      </FormField>

      <FormField label="Cantidad a ingresar">
        <input id="input-dinero" value={cantidad} onChange={(e) => setCantidad(e.target.value)} type="number" min="0" placeholder="0.00" />
      </FormField>

      <button type="submit" onClick={onRegisterClick}>Registrar</button>

      <EntryTypeModal
        open={showEntryModal}
        onClose={() => setShowEntryModal(false)}
        onChoose={handleConfirm}
      />
    </form>
  );
}

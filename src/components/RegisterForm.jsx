import { useMemo, useEffect, useState } from "react";
import { FormField } from './FormField'
import { SelectBox } from './SelectBox';

const tipos =  ["Activo", "Pasivo", "Capital"]
const activos =  ["Bancos", "Clientes", "Inventario", "Docs por cobrar",
  "Mobiliario y equipo", "Equipo de cómputo", "Terrenos"]
const pasivos = ["Docs por pagar", "Acreedores", "Proveedores"]
const capital = ["Capital social", "Resultados anteriores"]

export function RegisterForm({ onRegister }) {
  const [tipoSeleccionado, setTipo] = useState("");
  const [cuentaSeleccionada, setCuenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(""); 

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
    e.preventDefault();
    if (!tipoSeleccionado) return alert("Selecciona un tipo");
    if (!cuentaSeleccionada) return alert("Selecciona una cuenta");
    if (!cantidad) return alert("Ingresa una cantidad");

    const line = {
      fecha: fecha || new Date().toLocaleDateString('de-DE'),
      concepto: `${tipoSeleccionado} - ${cuentaSeleccionada}`,
      parcial: cantidad,
      debe: cantidad,
      haber: ""
    };

    if (typeof onRegister === "function") onRegister(line);

    setCantidad("");
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Registrar Cuenta</h5>
      <FormField label="Seleccionar cuenta (Concepto)">
        <div id="seleccion" >
          <SelectBox id="tipos" selected="Tipo" options={tipos} onChange={(v) => setTipo(v)} />
          <SelectBox id="cuentas" selected="Cuenta" options={cuentasFiltradas} onChange={(v) => setCuenta(v)} />
        </div>
      </FormField>

      <FormField label="Fecha (opcional)">
        <input value={fecha} onChange={(e) => setFecha(e.target.value)} type="date" />
      </FormField>

      <FormField label="Cantidad a ingresar">
        <input id="input-dinero" value={cantidad} onChange={(e) => setCantidad(e.target.value)} type="number" min="0" placeholder="0.00" />
      </FormField>

      <button type="submit">Registrar</button>
    </form>
  );
}

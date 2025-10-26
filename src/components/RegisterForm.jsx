import { useMemo, useEffect, useState } from "react";
import { FormField } from './FormField'
import { SelectBox } from './SelectBox';
import '../styles/form.css'

const tipos =  ["Activo", "Pasivo", "Capital"]
const activos =  ["Bancos", "Clientes", "Inventario", "Docs por cobrar",
  "Mobiliario y equipo", "Equipo de cómputo", "Terrenos"]
const pasivos = ["Docs por pagar", "Acreedores", "Proveedores"]
const capital = ["Capital social", "Resultados anteriores"]


export function RegisterForm() { 
  const [tipoSeleccionado, setTipo] = useState("");
  const [cuentaSeleccionada, setCuenta] = useState("");
  const cuentasFiltradas = useMemo(() => {
    switch (tipoSeleccionado) { 
      case 'Activo':
        return activos;
      case 'Pasivo':
        return pasivos;
      case 'Capital':
        return capital;
      default:
        return [...activos, ...pasivos, ...capital];
    }
  }, [tipoSeleccionado])

  useEffect(() => {
    if (cuentaSeleccionada && !cuentasFiltradas.includes(cuentaSeleccionada)) {
      setCuenta("");
    }
  }, [tipoSeleccionado, cuentaSeleccionada, cuentasFiltradas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoSeleccionado) return alert("Selecciona un tipo");
    if (!cuentaSeleccionada) return alert("Selecciona una cuenta");
  }

  return (
    <form onSubmit={handleSubmit}>
        <h5>Registrar Cuenta</h5>
        <FormField label="Seleccionar cuenta">
          <div id="seleccion">
            <SelectBox
              id="tipos"
              selected="Tipo"
              options={tipos}
              onChange={(v) => setTipo(v)}
            />
            <SelectBox
              id="cuentas"
              selected="Nombre"
              options={cuentasFiltradas}
              onChange={(v) => setCuenta(v)}
            />
          </div>
        </FormField>

        <FormField label="Cantidad a ingresar">
          <input id="input-dinero" type="number" min="1" placeholder="pa la bendi"/>
        </FormField>

        <button>Registrar</button>
      </form>
  );
}
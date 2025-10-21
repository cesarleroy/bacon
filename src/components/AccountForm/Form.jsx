import React, { useMemo, useEffect, useState } from "react";
import { Button } from './Button'
import { TextLabel } from './TextLabel'
import { Input } from './Input'
import { SelectBox } from './SelectBox'

const tipos = ["Activo", "Pasivo", "Capital"]
const cuentasActivo = ["Bancos", "Clientes", "Inventario", "Docs por cobrar",
  "Mobiliario y equipo", "Equipo de cómputo", "Terrenos"]
const cuentasPasivo = ["Docs por pagar", "Acreedores", "Proveedores"]
const cuentasCapital = ["Capital social", "Resultados anteriores"]

export function Form() { 
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState("");

  const cuentasFiltradas = useMemo(() => {
    switch (tipoSeleccionado) {
      case "Activo":
        return cuentasActivo;
      case "Pasivo":
        return cuentasPasivo;
      case "Capital":
        return cuentasCapital;
      default:
        return [...cuentasActivo, ...cuentasPasivo, ...cuentasCapital];
    }
  }, [tipoSeleccionado]);

  useEffect(() => {
    if (cuentaSeleccionada && !cuentasFiltradas.includes(cuentaSeleccionada)) {
      setCuentaSeleccionada("");
    }
  }, [tipoSeleccionado, cuentasFiltradas, cuentaSeleccionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoSeleccionado) return alert("Selecciona un tipo");
    if (!cuentaSeleccionada) return alert("Selecciona una cuenta");
    console.log({ tipo: tipoSeleccionado, cuenta: cuentaSeleccionada });
  };

  return (
    <div id="container">
      <form onSubmit={handleSubmit}>
        <h3>Registrar Cuenta</h3>
        
        <TextLabel >
          Seleccionar Cuenta
          <br/>
        </TextLabel>
        
        <div id="seleccionar-cuenta">
          <SelectBox
            id="tipos"
            selected="Tipo"
            options={tipos}
            onChange={(v) => setTipoSeleccionado(v)}
          />
          <SelectBox
            id="cuentas"
            selected="Nombre"
            options={cuentasFiltradas}
            onChange={(v) => setCuentaSeleccionada(v)}
          />
        </div>  
        
        <TextLabel>
          <br/>
          Cantidad
          <br/>
        </TextLabel>

        <Input type="number" placeholder='pa la bendi sus 5mil'>
        </Input>
        
        <br />
        <Button text="Registrar"/>
      </form>
      
      <div id="canvas">
        <h3>Canvas</h3>
      </div>
    </div>
  )
}
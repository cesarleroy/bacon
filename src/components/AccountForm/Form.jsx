import { Button } from './Button'
import { TextLabel } from './TextLabel'
import { Input } from './Input'
import { SelectBox } from './SelectBox'

const tipos = ["Activo", "Pasivo", "Capital"]
const cuentas  = ["Bancos", 
                  "Clientes", 
                  "Docs por pagar", 
                  "Acreedores", 
                  "Inventario",
                  "Proveedores",
                  "Docs por cobrar",
                  "Mobiliario y equipo",
                  "Equipo de cómputo",
                  "Terrenos"
                ]
const cuentasActivo = []
const cuentasPasivo = []
const cuentasCapital = []

export function Form() { 
  return (
    <div id="container">
      <form>
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
          />
          <SelectBox
            id="cuentas"
            selected="Nombre"
            options={cuentas}
          />
        </div>  
        <TextLabel>
          <br/>
          Cantidad
          <br/>
        </TextLabel>
        <Input type="number" placeholder='pa la bendi sus 5mil'>
        </Input>
        <br/>
        <Button text="Registrar"/>
      </form>
      <div id="canvas">
        <h3>Canvas</h3>
      </div>
    </div>
  )
}
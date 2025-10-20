import { Button } from './Button'
import { TextLabel } from './TextLabel'
import { Input } from './Input'
import { SelectBox } from './SelectBox'

export function Form() { 
  return (
    <>
      <h4>Registrar Cuenta</h4>
      <form>
        <TextLabel >
          Seleccionar Cuenta
          <br/>
        </TextLabel>
        <SelectBox
          id="tipos"
          selected="Tipo"
          options={["Activo", "Pasivo", "Capital"]}
        />
        <SelectBox
          id="cuentas"
          selected="Nombre"
          options={["Banco", "Clientes", "Inventario"]}
        />
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
    </>
  )
}
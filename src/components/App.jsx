// App.jsx
import { TitleBar } from '../components/TitleBar'
import { RegisterForm } from '../components/RegisterForm'
import { Journal } from '../components/Journal'
import { AccountCard } from '../components/AccountCard'
import { useState, useEffect } from "react";

export function App() {
  const [lines, setLines] = useState([]);
  const [header, setHeader] = useState({ folio: "001", fecha: "" });

  // NUEVO: almacenar la cuenta seleccionada en el formulario
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  // NUEVO: lista completa de cuentas desde cuentas.json
  const [cuentas, setCuentas] = useState([]);

  // Cargar cuentas.json una sola vez
  useEffect(() => {
    fetch('/cuentas.json')               // Asegúrate de colocar cuentas.json en /public
      .then(res => res.json())
      .then(data => setCuentas(data))
      .catch(err => console.error("Error al cargar cuentas.json:", err));
  }, []);

  // llamada desde RegisterForm: añade línea al array y Journal se actualizará
  function handleRegisterLine(line) {
    setLines(prev => [...prev, line]);
  }

  // NUEVO: cuando RegisterForm cambie de cuenta, buscarla en el JSON
  function handleCuentaChange(nombreCuenta) {
    if (!nombreCuenta) {
      setCuentaSeleccionada(null);
      return;
    }

    const encontrada = cuentas.find(c => c.nombre === nombreCuenta);
    setCuentaSeleccionada(encontrada || null);
  }

  return (
    <>
      <TitleBar>Balance Contable Online</TitleBar>

      <div id="canvas">
        <div>
          <RegisterForm
            onRegister={handleRegisterLine}
            onCuentaChange={handleCuentaChange}  
          />
        </div>

        <div id="rayado-info">
          <Journal
            lines={lines}
            header={header}
            cuentaSeleccionada={cuentaSeleccionada}
          />
        </div>
      </div>
    </>
  );
}

// App.jsx
import { TitleBar } from '../components/TitleBar'
import { RegisterForm } from '../components/RegisterForm'
import { Journal } from '../components/Journal'
import { AccountCard } from '../components/AccountCard'
import { useState, useEffect } from "react";

export function App() {
  const [lines, setLines] = useState([]);
  const [header, setHeader] = useState({ folio: "001", fecha: "" });
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    fetch('/cuentas.json')
      .then(res => res.json())
      .then(data => setCuentas(data))
      .catch(err => console.error("Error al cargar cuentas.json:", err));
  }, []);

  function handleRegisterLine(line) {
    setLines(prev => [...prev, line]);
  }

  function handleCuentaChange(nombreCuenta) {
    if (!nombreCuenta) {
      setCuentaSeleccionada(null);
      return;
    }
    const encontrada = cuentas.find(c => c.nombre === nombreCuenta);
    setCuentaSeleccionada(encontrada || null);
  }

  function onUpdateTotal(debe, haber) {
    setTotalDebe(prev => prev + Number(debe || 0));
    setTotalHaber(prev => prev + Number(haber || 0));
  }

  return (
    <>
      <TitleBar>Balance Contable Online</TitleBar>

      <div id="canvas">
        <div>
          <RegisterForm
            onRegister={handleRegisterLine}
            onCuentaChange={handleCuentaChange}
            onUpdateTotal={onUpdateTotal}
          />
        </div>

        <div id="rayado-info">
          <Journal
            lines={lines}
            header={header}
            cuentaSeleccionada={cuentaSeleccionada}
            totalDebe={totalDebe}
            totalHaber={totalHaber}
          />
        </div>
      </div>
    </>
  );
}

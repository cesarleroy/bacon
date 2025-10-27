// App.jsx
import { TitleBar } from '../components/TitleBar'
import { RegisterForm } from '../components/RegisterForm'
import { Journal } from '../components/Journal'
import { AccountCard } from '../components/AccountCard'
import { useState } from "react";

export function App() {
  const [lines, setLines] = useState([]);
  const [header, setHeader] = useState({ folio: "001", fecha: "" });

  // llamada desde RegisterForm: añade línea al array y Journal se actualizará
  function handleRegisterLine(line) {
    setLines(prev => [...prev, line]);
  }

  return (
    <>
      <TitleBar>Balance Contable Online</TitleBar>
      <div id="canvas" style={{ display: "flex", gap: 12 }}>
        <div style={{ width: 420 }}>
          <RegisterForm onRegister={handleRegisterLine} />
          <div style={{ marginTop: 12 }}>
            <AccountCard>
              <p>Ejemplo de info</p>
            </AccountCard>
          </div>
        </div>

        <div id="rayado-info" style={{ flex: 1 }}>
          <Journal lines={lines} header={header} />
        </div>
      </div>
    </>
  );
}

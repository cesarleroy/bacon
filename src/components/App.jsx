import { TitleBar } from '../components/TitleBar'
import { RegisterForm } from '../components/RegisterForm'
import { Journal } from '../components/Journal'
import { AccountCard } from '../components/AccountCard'
import '../styles/canvas.css'


export function App() { 
  return (
    <>
      <TitleBar>
        Titulo
      </TitleBar>
      <div id="canvas">
        <RegisterForm />
        <div id="rayado-info">
          <Journal />
          <AccountCard>
            <p>"Recuerda que la cuenta de bancos es un activo y es de naturaleza deudora"</p>
          </AccountCard>
        </div>
      </div>
    </>
  );
}
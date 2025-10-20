import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Form } from './components/AccountForm/Form'
import { Header } from './components/Header/Header'

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <Header/>
    <Form />
  </>
)

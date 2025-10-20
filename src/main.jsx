import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Form } from './components/AccountForm/Form'

const root = createRoot(document.getElementById('root'));

root.render(
  <Form />
)

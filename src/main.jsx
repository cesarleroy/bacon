import { createRoot } from 'react-dom/client'
import '../src/styles/global.css'
import './index.css'
import { App } from '../src/components/App'
import { Navbar } from '../src/components/Navbar'

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <Navbar />
    <App />
  </>
)

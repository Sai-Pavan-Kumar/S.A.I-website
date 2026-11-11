import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './site/tokens.css'
import App from './App.jsx'

// Entrance animations hide content only when this script runs, so a failed bundle never leaves a blank page.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

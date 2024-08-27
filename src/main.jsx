import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import "../node_modules/flowbite/dist/flowbite.min.js"
// import "../node_modules/@fortawesome/fontawesome-free/js/all.min"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

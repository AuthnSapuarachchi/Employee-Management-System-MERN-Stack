import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MinimalApp from './MinimalApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MinimalApp />
  </StrictMode>
)

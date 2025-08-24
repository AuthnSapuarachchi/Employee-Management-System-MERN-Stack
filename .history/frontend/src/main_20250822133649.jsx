import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TestComponent from './TestComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestComponent />
  </StrictMode>
)

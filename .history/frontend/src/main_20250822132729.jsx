import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SimpleTest from './SimpleTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SimpleTest />
  </StrictMode>
)

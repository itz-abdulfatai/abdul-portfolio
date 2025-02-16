import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SettingContextProvider } from './contexts/settingContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <SettingContextProvider>

  <StrictMode>
    <App />
  </StrictMode>
  </SettingContextProvider>
  </BrowserRouter>
)

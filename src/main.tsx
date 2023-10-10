import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext.tsx'
import { ConfirmContextProvider } from './context/ConfirmContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <ConfirmContextProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ConfirmContextProvider>
    </ToastProvider>
  </React.StrictMode>,
)

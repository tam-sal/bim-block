import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </GlobalProvider>
  </React.StrictMode>,
)

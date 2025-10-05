import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './contexts/AdminContext.jsx'
import DoctorContextProvider from './contexts/DoctorContext.jsx'
import AppContextProvider from './contexts/AppContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)

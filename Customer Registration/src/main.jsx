import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import ClientList from './pages/ClientList.jsx'
import LoginScreen from './pages/LoginScreen.jsx'
import Scheduling from './pages/Scheduling.jsx'
import PrivateRoute from './route/PrivateRoute.jsx'


createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
      <Routes>  
        <Route path='/' element={<LoginScreen />} />      
        <Route
          path='/client-list'
          element={
            <PrivateRoute>
              <ClientList />
            </PrivateRoute>
          }
        />
        <Route
          path='/scheduling'
          element={
            <PrivateRoute>
              <Scheduling />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

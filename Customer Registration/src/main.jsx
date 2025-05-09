import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import ClientList from './pages/ClientList.jsx'
import LoginScreen from './pages/LoginScreen.jsx'
import Scheduling from './pages/Scheduling.jsx'
import Registers from './pages/Registers.jsx'
import Registers from './pages/Registers.jsx'


createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/client-list' element={<ClientList/>}/>
        <Route path='/scheduling' element ={<Scheduling/>}/>
        <Route path='/client-list/:id' element = {<Registers/>}/>
        <Route path='/client-list/:id' element = {<Registers/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

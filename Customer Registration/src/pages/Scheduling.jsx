import React from 'react'
import Navbar from '../Components/Navbar'
import { useClients } from '../hooks/useClients';

const Scheduling = () => {

  const {
    currentClients
  } = useClients();

  return (
    <div className="w-full flex flex-col items-center min-h-screen dark:bg-gray-950  dark:text-white bg-slate-100">
      <Navbar/>
      <ul>
        {currentClients.map((client) =>(
          <li>{client.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Scheduling

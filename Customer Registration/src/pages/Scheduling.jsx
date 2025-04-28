import React from 'react'
import Navbar from '../Components/Navbar'
import { useClients } from '../hooks/useClients';
import { useState } from 'react';

const Scheduling = () => {

  const {
    currentClients
  } = useClients();

  const [date, setDate] = useState('')

  return (
    <div className="w-full flex flex-col items-center min-h-screen dark:bg-gray-950  dark:text-white bg-slate-100">
      <Navbar/>
      <div className='mt-7 w-full flex flex-col items-center'>
        <h1 className='text-2xl text-center'>Agendamentos</h1>
        <div className='flex gap-2 justify-center mt-10  rounded-md p-2  max-w-96'>
          <label className='flex items-center' htmlFor="selectedDate">
            <span className='text-lg'>Selecione a data: </span>
          </label>
          <input onChange={e => setDate(e.target.value)} className=' max-w-60 p-2 rounded-md focus:outline-0 border-1 
          dark:bg-slate-800 dark:border-slate-700 border-slate-400 mt-1'
          type="date" name="selectedDate" id="selectedDate" />
        </div>
      </div>
      <hr className="border-1 border-slate-200 dark:border-slate-900 w-full my-2" />

      <ul className='w-full flex justify-center mt-4'>
        {currentClients.filter(client => client.registers.some(register => register.status === "waiting" && register.date === date))
        .map(client =>{
          const waiting = client.registers.find(register => register.status === 'waiting')
        return(
          <li>
            <div className='flex flex-col p-2 rounded-lg border-1 shadow-md shadow-black bg-slate-200 border-slate-400 dark:bg-sky-800 dark:border-sky-600 max-w-90'>
              <div className='flex flex-col gap-1 text-center'>
                <h3>Nome: {client.name}</h3>
                <hr className='border-slate-400' />
                <p className='mt-3'>Endereço:</p>
                <p>{client.street}, {client.number}, {client.neighborhood}</p>
                <p>{client.reference}</p>
                <hr className='border-slate-400' />
                <div className='mt-3'>
                
                  <p>Serviço:</p>
                  <p>{waiting?.text}</p>
                </div>
              </div>
              <div>
                <p></p>
              </div>
            </div>
          </li>)})
          
        }
      </ul>
    </div>
  )
}

export default Scheduling

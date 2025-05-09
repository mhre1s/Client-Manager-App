import React from 'react';
import { useParams } from 'react-router';
import { useClients } from '../hooks/useClients';
import Navbar from '../Components/Navbar';


const Registers = () => {
  const { id } = useParams();
  const { clients } = useClients();
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center min-h-screen dark:bg-gray-950 dark:text-white bg-slate-100">
      <Navbar />
      <div className="px-4 w-full">
        <div className="flex flex-col text-center gap-4 w-full bg-white dark:bg-slate-900 shadow-md rounded-lg p-4 mb-6 mx-auto overflow-x-auto">
          <h1 className="text-2xl">{client.name}</h1>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-slate-800 text-center">
                <th className="border px-4 py-2 dark:border-slate-500">Serviço</th>
                <th className="border px-4 py-2 dark:border-slate-500">Valor cobrado</th>
                <th className="border px-4 py-2 dark:border-slate-500">Status</th>
                <th className="border px-4 py-2 dark:border-slate-500">Data</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {client.registers.length > 0 ? (
                client.registers.map((reg, index) => {
                    const [year, month, day] = reg.date.split('-')
                    const formattedDate = `${day}/${month}/${year}`
                    const ptStatus = {
                        completed: 'Concluído',
                        waiting: 'Em espera',
                        canceled: 'Cancelado'
                    }[reg.status]

                    const statusColor = {
                        completed: 'text-green-600 dark:text-green-500',
                        waiting: 'text-blue-600 dark:text-blue-500',
                        canceled: 'text-red-600 dark:text-red-500'
                    }[reg.status]

                  return (
                  <tr key={index} className="hover:bg-gray-100 hover:dark:bg-slate-800 text-center">
                    <td className="border px-4 py-2 dark:border-slate-500">{reg.text}</td>
                    <td className="border px-4 py-2 dark:border-slate-500">{reg.value}</td>
                    <td className={`border px-4 py-2 dark:border-slate-500 ${statusColor}`}>{ptStatus}</td>
                    <td className="border px-4 py-2 dark:border-slate-500">
                        {formattedDate}</td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-center">
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registers;


import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ClientForm from "../Components/ClientForm";
import { useNavigate } from "react-router";
import { useClients } from '../hooks/useClients';
import Navbar from "../Components/Navbar";
import { X } from 'lucide-react';
import { Eye } from 'lucide-react'
import { Link } from "react-router";


const Home = () => {

  const {
    currentClients,
    currentPage,
    totalPages,
    searchQuery,
    formData,
    loading,
    error,
    isModalOpen,
    editMode,
    handleSearch,
    handleNextPage,
    handlePreviousPage,
    handleEdit,
    handleSubmit,
    setFormData,
    setEditMode,
    setIsModalOpen,
    handleRegisterChange,
    handleDeleteClientRegister,
    handleAddRegister,
  } = useClients();

  const changeColor = (status) => {
    if (status === "completed") return "border-green-500";
    if (status === "waiting") return "border-blue-500";
    if (status === "canceled") return "border-red-500";
    return "border-gray-500";
  };


  return (
    <div className="w-full flex flex-col gap-3 items-center min-h-screen dark:bg-gray-950  dark:text-white bg-slate-100">
      <Navbar/>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="sm:px-10 w-full">
      <div className="flex justify-center w-full sm:justify-end p-1">
        <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Pesquisar cliente"
                className="w-full max-w-xs border border-slate-300 dark:border-slate-700 p-2 rounded-lg focus:outline-hidden"
        />
      </div>
      
      <div className="flex flex-col gap-2 w-full bg-white 
      dark:bg-slate-900 shadow-md rounded-lg p-4 mb-6 mx-auto overflow-x-auto">
      
        <table className="w-full table-auto border-separate">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-800 text-left">
              <th className="border px-4 py-2 dark:border-slate-500">Nome</th>
              <th className="border px-4 py-2 dark:border-slate-500">Telefone</th>
              <th className="border px-4 py-2 dark:border-slate-500">Endereço</th>
              <th className="border px-4 py-2 dark:border-slate-500">Bairro</th>
              <th className="border px-4 py-2 dark:border-slate-500 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-100 hover:dark:bg-slate-800">
                  <td className="border px-4 py-2 dark:border-slate-500">{client.name}</td>
                  <td className="border px-4 py-2 dark:border-slate-500">{client.phone}</td>
                  <td className="border px-4 py-2 dark:border-slate-500">
                    {client.street}, {client.number}
                  </td>
                  <td className="border px-4 py-2 dark:border-slate-500">{client.neighborhood}</td>
                  <td className="border px-4 py-2 dark:border-slate-500">
                    <div className="flex justify-center gap-2" >
                      <button
                      className="transition duration-300 p-1 dark:text-white bg-slate-200 text-black rounded-lg 
                      cursor-pointer hover:bg-slate-500 flex items-center justify-center dark:bg-slate-700 gap-2"
                      onClick={() => handleEdit(client.id)}
                    >
                      <FaEdit className="ml-0.5"/>
                      </button>
                      <Link to={`/client-list/${client.id}`}>
                        <button className="transition duration-300 p-1 dark:text-white bg-slate-200 text-black rounded-lg 
                          cursor-pointer hover:bg-slate-500 flex items-center justify-center dark:bg-slate-700 gap-2">
                          <Eye size={16}/>
                        </button>
                      </Link>
                      
                    
                    </div>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4 border">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
      

      <div className="flex gap-4 mb-2 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-1 text-white cursor-pointer"
        >
          <FaChevronLeft className="text-black dark:text-gray-200" size={20} />
        </button>
        <span className="text-lg dark:text-gray-200 font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-1 text-white"
        >
          <FaChevronRight className="text-black dark:text-gray-200" size={20} />
        </button>
      </div>

      <button
        onClick={() => {
          setFormData({
            name: "",
            phone: "",
            street: "",
            number: "",
            neighborhood: "",
            reference: "",
            complement: "",
            provider: "",
            observation: "",
            registers: [],
          });
          setEditMode(false);
          setIsModalOpen(true);
        }}
        className="mb-5 cursor-pointer transition duration-500 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:hover:bg-blue-700"
      >
        Adicionar Cliente
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Editar Cliente" : "Cadastrar Cliente"}
              </h2>
              <X onClick={() => setIsModalOpen(false)} className="text-red-500 hover:cursor-pointer"/>
            </div>
           
            <ClientForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            >
              <label htmlFor="registers" className="block mb-2">
                Registros de Atendimento
              </label>
              {formData.registers.map((register, index) => (
                <div
                  key={index}
                  className={`mb-4 min-w-full border p-3 rounded-lg ${changeColor(
                    register.status
                  )}`}
                >
                  <textarea
                    value={register.text}
                    onChange={(e) =>
                      handleRegisterChange(index, "text", e.target.value)
                    }
                    rows="3"
                    className="w-full p-2 border rounded-sm mb-2"
                    placeholder="Registro de atendimento"
                    required
                  />
                  <label className="block font-medium mb-1">
                    Valor Cobrado (R$)
                  </label>
                  <input
                    required
                    type="number"
                    value={register.value}
                    onChange={(e) =>
                      handleRegisterChange(index, "value", e.target.value)
                    }
                    className="w-full p-2 border rounded-sm mb-2"
                    placeholder="Digite o valor cobrado"
                  />
                  <label className="block font-medium mb-1">
                    Data do atendimento
                  </label>
                  <input
                    type="date"
                    required
                    value={register.date}
                    onChange={(e) =>
                      handleRegisterChange(index, "date", e.target.value)
                    }
                    className="w-full p-2 border rounded-sm mb-2"
                    placeholder="Digite o valor cobrado"
                  />
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-around flex-col gap-5 sm:flex-row">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "completed");
                        }}
                        className="cursor-pointer mx-auto px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500 w-36"
                      >
                        Concluído
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "waiting");
                        }}
                        className="cursor-pointer mx-auto px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 w-36"
                      >
                        Em andamento
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "canceled");
                        }}
                        className="cursor-pointer mx-auto px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 w-36"
                      >
                        Cancelado
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteClientRegister(index)}
                      className="cursor-pointer block mx-auto px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <button
                type="button"
                onClick={handleAddRegister}
                className="cursor-pointer px-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 duration-500"
              >
                Adicionar Registro
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="cursor-pointer transition duration-500 px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Cancelar
              </button>
              <input
                disabled={loading}
                type="submit"
                value="Salvar"
                className="cursor-pointer transition duration-500 px-2 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400"
              />
              </div>
              
            </ClientForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;








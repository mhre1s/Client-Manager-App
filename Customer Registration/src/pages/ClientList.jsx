import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ClientForm from "../Components/ClientForm";
import { useNavigate } from "react-router";
import { useClients } from '../hooks/useClients';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])
  

  const changeTheme = (e) => {
    e.preventDefault()
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const navigate = useNavigate();

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

  const handleLogoff = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen dark:bg-gray-950  dark:text-white bg-slate-100">
      <nav className="w-full bg-slate-50 mb-6  dark:bg-slate-950
      flex justify-center gap-60 items-center p-4 border-b-1 border-b-slate-300 
      dark:border-b-slate-800">
        <div className="flex items-center max-w-4xl justify-between w-full">
          <h1 className=" text-slate-950 text-2xl hidden sm:block font-bold dark:text-gray-200">
            Cadastro de clientes
          </h1>
          <div className="flex items-center gap-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pesquisar cliente"
              className="w-full max-w-xs border dark:border-slate-700 p-2 rounded-lg focus:outline-hidden"
            />
            <div className="flex rounded-2xl bg-slate-300 dark:bg-slate-700 p-1 gap-1">
              <button onClick={changeTheme} className={`p-1 ${theme === 'light' ? 'rounded-3xl bg-white dark:bg-slate-400' : ''}`}><RiSunFill/></button>
              <button onClick={changeTheme} className={`p-1 ${theme === 'dark' ? 'rounded-3xl bg-white dark:bg-slate-400' : ''}`}><RiMoonClearFill/></button>
            </div>
            <button
              onClick={handleLogoff}
              className="text-black hover:text-gray-700 cursor-pointer"
            >
              <FaSignOutAlt className="dark:text-slate-700 hover:dark:text-slate-500" size={24} />
            </button>
          </div>
        </div>
      </nav>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-4xl bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 mb-6 overflow-x-auto">
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
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-100 hover:dark:bg-slate-600">
                  <td className="border px-4 py-2 dark:border-slate-500">{client.name}</td>
                  <td className="border px-4 py-2 dark:border-slate-500">{client.phone}</td>
                  <td className="border px-4 py-2 dark:border-slate-500">
                    {client.street}, {client.number}
                  </td>
                  <td className="border px-4 py-2 dark:border-slate-500">{client.neighborhood}</td>
                  <td className="border px-4 py-2 dark:border-slate-500 text-center">
                    <button
                      className="transition duration-300 px-3 py-1 bg-slate-200 text-black rounded-lg 
                      cursor-pointer hover:bg-slate-300 flex items-center dark:bg-slate-400 gap-2"
                      onClick={() => handleEdit(client.id)}
                    >
                      <FaEdit />
                      Editar
                    </button>
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

      <div className="flex gap-4 mb-6 items-center">
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
        className="cursor-pointer transition duration-500 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:hover:bg-blue-700"
      >
        Adicionar Cliente
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Editar Cliente" : "Cadastrar Cliente"}
            </h2>
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
                  />
                  <label className="block font-medium mb-1">
                    Valor Cobrado (R$)
                  </label>
                  <input
                    type="number"
                    value={register.value}
                    onChange={(e) =>
                      handleRegisterChange(index, "value", e.target.value)
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








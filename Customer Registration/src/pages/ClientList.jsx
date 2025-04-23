import React from "react";
import {
  FaEdit,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ClientForm from "../Components/ClientForm";
import { useNavigate } from "react-router";
import { useClients } from '../hooks/useClients';

const Home = () => {
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
    <div className="w-full flex flex-col items-center min-h-screen bg-slate-100">
      <nav className="w-full bg-slate-50 shadow-md shadow-gray-500 mb-6 flex justify-center gap-60 items-center p-4">
        <div className="flex items-center max-w-4xl justify-between w-full">
          <h1 className="text-gray-800 text-3xl font-bold">
            Cadastro de clientes
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pesquisar cliente"
              className="w-full max-w-xs border p-2 rounded-lg"
            />
            <button
              onClick={handleLogoff}
              className="text-black hover:text-gray-800"
            >
              <FaSignOutAlt size={24} />
            </button>
          </div>
        </div>
      </nav>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mb-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Telefone</th>
              <th className="border px-4 py-2">Endereço</th>
              <th className="border px-4 py-2">Bairro</th>
              <th className="border px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{client.name}</td>
                  <td className="border px-4 py-2">{client.phone}</td>
                  <td className="border px-4 py-2">
                    {client.street}, {client.number}
                  </td>
                  <td className="border px-4 py-2">{client.neighborhood}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="transition duration-300 px-3 py-1 bg-slate-200 text-black rounded-lg hover:bg-slate-300 flex items-center gap-2"
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
          className="p-1 text-white"
        >
          <FaChevronLeft className="text-black" size={20} />
        </button>
        <span className="text-lg font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
        >
          <FaChevronRight className="text-black" size={20} />
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
        className="transition duration-500 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#55ACEE]"
      >
        Adicionar Cliente
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
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
                  className={`mb-4 border p-3 rounded-lg ${changeColor(
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
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-around">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "completed");
                        }}
                        className="mx-auto px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500"
                      >
                        Concluído
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "waiting");
                        }}
                        className="mx-auto px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                      >
                        Em andamento
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegisterChange(index, "status", "canceled");
                        }}
                        className="mx-auto px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500"
                      >
                        Cancelado
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteClientRegister(index)}
                      className="block mx-auto px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddRegister}
                className="px-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 duration-500"
              >
                Adicionar Registro
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="transition duration-500 px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Cancelar
              </button>
              <input
                disabled={loading}
                type="submit"
                value="Salvar"
                className="transition duration-500 px-2 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400"
              />
            </ClientForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;








import React, { useState, useEffect } from "react";
import { FaEdit, FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ClientForm from "../Components/ClientForm";
import { useNavigate } from "react-router";

const url = "http://localhost:3000/clientes";

const Home = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [status, setStatus] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    number: "",
    neighborhood: "",
    reference: "",
    complement: "",
    provider: "",
    observation:"",
    registers: [],
  });

  const changeColor = (status) =>{
    console.log(status)
    if(status === 'completed'){
      let color = 'border-green-500'
      return color
    }
    if(status === 'waiting'){
      let color = 'border-blue-500'
      return color
    }
    if(status === 'canceled'){
      let color = 'border-red-500'
      return color
    }
    return "border-gray-500"
  }

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 11;

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Erro ao carregar clientes");
      }
      const data = await res.json();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(editMode ? `${url}/${currentClientId}` : url, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const newClient = await res.json();

      if (editMode) {
        setClients((prev) =>
          prev.map((client) =>
            client.id === currentClientId ? newClient : client
          )
        );
        setFilteredClients((prevClients) =>
          prevClients.map((client) =>
            client.id === currentClientId ? newClient : client
          )
        );
      } else {
        setClients((prev) => [...prev, newClient]);
        setFilteredClients((prevClients) => [...prevClients, newClient]);
      }

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
      setIsModalOpen(false);
      setEditMode(false);
      setCurrentClientId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRegister = () => {
    setFormData((prevData) => ({
      ...prevData,
      registers: [...prevData.registers, { text: "", value: "" , status: "waiting"}],
    }));
  };

  const handleRegisterChange = (index, field, value) => {
    const updatedRegisters = [...formData.registers];
    updatedRegisters[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      registers: updatedRegisters,
    }));
  };

  const handleDeleteRegister = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      registers: prevData.registers.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (client) => {
    setFormData({
      ...client,
      registers: client.registers || [],
    });
    setCurrentClientId(client.id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.phone.includes(query) ||
        client.street.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
    setCurrentPage(1); 
  };

  const handleLogoff = () => {
    navigate("/");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);


  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-slate-300">
      <nav className="w-full bg-slate-200 shadow-xl shadow-gray-500 mb-6 flex justify-center gap-60 items-center p-4">
        <div className="flex items-center max-w-4xl justify-between w-full">
          <h1 className="text-gray-800 text-3xl font-bold">Cadastro de clientes</h1>
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
                      onClick={() => handleEdit(client)}
                    >
                      <FaEdit />
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 border"
                >
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
    className="p-2 bg-[#3B5998] text-white rounded-lg disabled:bg-[#55ACEE]  flex items-center"
  >
    <FaChevronLeft size={20} />
  </button>
  <span className="text-lg font-medium">
    Página {currentPage} de {totalPages}
  </span>
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className="p-2 bg-[#3B5998] text-white rounded-lg disabled:bg-[#55ACEE] flex items-center"
  >
    <FaChevronRight size={20} />
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
            observation:"",
            registers: [],
          });
          setEditMode(false);
          setIsModalOpen(true);
        }}
        className="transition duration-500 px-4 py-2 bg-[#3B5998] text-white rounded-lg hover:bg-[#55ACEE]"
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
                <div key={index} className={`mb-4 border p-3 rounded-lg ${changeColor(register.status)}`}>
                  <textarea
                    value={register.text}
                    onChange={(e) =>
                      handleRegisterChange(index, "text", e.target.value)
                    }
                    rows="3"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Registro de atendimento"
                  />
                  <label className="block font-medium mb-1">Valor Cobrado (R$)</label>
                  <input
                    type="number"
                    value={register.value}
                    onChange={(e) =>
                      handleRegisterChange(index, "value", e.target.value)
                    }
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Digite o valor cobrado"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-around">
                      <button onClick={(e) => {e.preventDefault(); handleRegisterChange(index, "status", "completed")}} 
                        className="mx-auto px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500">Concluído</button>
                      <button onClick={(e) => {e.preventDefault(); handleRegisterChange(index, "status", "waiting")}} 
                         className="mx-auto px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500">Em andamento</button>
                      <button onClick={(e) => {e.preventDefault(); handleRegisterChange(index, "status", "canceled")}} 
                         className="mx-auto px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500">Cancelado</button>
                    </div>
                   
                    <button
                    type="button"
                    onClick={() => handleDeleteRegister(index)}
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
                className="px-2 py-2 bg-slate-200 text-black rounded-lg hover:bg-slate-300"
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
                className="transition duration-500 px-2 py-2 bg-slate-200 text-black rounded-lg hover:bg-slate-300"
              />
            </ClientForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;








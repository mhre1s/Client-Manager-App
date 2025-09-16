import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { query, where } from "firebase/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    registers: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);

  const clientsPerPage = 11;

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

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

const fetchClients = async () => {
  try {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setError("Usuário não autenticado");
      setLoading(false);
      return;
    }

    const clientsRef = collection(db, "clients");
    const q = query(clientsRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const clientsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const ordenedClients = clientsData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setClients(ordenedClients);
    setFilteredClients(ordenedClients);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setError("Erro ao buscar clientes");
    setLoading(false);
  }
};

  const handleSearch = (searchTerm) => {
    setFilteredClients(
      clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode) {
        const clientRef = doc(db, "clients", currentClientId);
        await updateDoc(clientRef, formData);
      } else {
        await addDoc(collection(db, "clients"), {
          ...formData,
          userId: auth.currentUser.uid, // adiciona o ID do usuário ao cliente
        });
      }
      fetchClients();
      setFormData({ name: "", registers: [] });
      setIsModalOpen(false);
      setEditMode(false);
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      setError("Erro ao salvar cliente");
    }
  };

  const handleDeleteClientRegister = (index) => {
    setFormData((prevFormData) => {
      const updatedRegisters = [...prevFormData.registers];
      updatedRegisters.splice(index, 1);
      return {
        ...prevFormData,
        registers: updatedRegisters,
      };
    });
  };

  const handleEdit = (clientId) => {
    const clientToEdit = clients.find((client) => client.id === clientId);
    if (clientToEdit) {
      setFormData({
        ...clientToEdit,
      });
      setEditMode(true);
      setCurrentClientId(clientId);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    filteredClients,
    currentClients,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDeleteClientRegister,
    handleNextPage,
    handlePreviousPage,
    handleSearch,
    fetchClients,
    handleSubmit,
    formData,
    setFormData,
    editMode,
    setEditMode,
    isModalOpen,
    setIsModalOpen,
    currentClientId,
    setCurrentClientId,
    handleAddRegister: () =>
      setFormData((prev) => ({
        ...prev,
        registers: [...(prev.registers || []), ""],
      })),
    handleRegisterChange: (index, field, value) => {
      const newRegisters = [...formData.registers];
      newRegisters[index] = {
        ...newRegisters[index],
        [field]: value,
      };
      setFormData({ ...formData, registers: newRegisters });
    },
    handleEdit,
  };
};

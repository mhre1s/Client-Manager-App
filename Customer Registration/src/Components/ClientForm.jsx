import React from "react";


const formatPhone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") 
    .slice(0, 15);
};

const ClientForm = ({ formData, setFormData, handleSubmit, children }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    const formattedValue = name === "phone" ? formatPhone(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Telefone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
          maxLength="15"  
        />
      </div>
      <div>
        <label className="block font-medium">Rua</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-medium">Número</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-medium">Bairro</label>
        <input
          type="text"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-medium">Referência</label>
        <input
          type="text"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-medium">Complemento</label>
        <input
          type="text"
          name="complement"
          value={formData.complement}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label className="block font-medium">Provedor</label>
        <input
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3 justify-end space-x-4">
        {children}
      </div>
    </form>
  );
};

export default ClientForm;



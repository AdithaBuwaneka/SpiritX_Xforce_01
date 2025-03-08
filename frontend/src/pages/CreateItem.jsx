import { useState } from "react";
import { createItem } from "../../services/itemService";
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
  const [form, setForm] = useState({ name: "", price: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(form);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateItem;

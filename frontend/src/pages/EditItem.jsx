import { useEffect, useState } from "react";
import { getItem, updateItem } from "../../services/itemService";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    const loadItem = async () => {
      const data = await getItem(id);
      setForm(data);
    };
    loadItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(id, form);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Edit Item</h2>
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditItem;

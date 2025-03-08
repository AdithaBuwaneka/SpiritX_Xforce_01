import { useEffect, useState } from "react";
import { fetchItems, deleteItem } from "../../services/itemService";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      setItems(Array.isArray(data) ? data : []);
    };
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Items List</h2>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Item
      </Link>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="border p-4 mb-2 flex justify-between items-center bg-white shadow-md rounded">
              <span className="text-lg">{item.name} - ${item.price}</span>
              <div>
                <Link to={`/edit/${item._id}`} className="text-green-500 mx-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(item._id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;

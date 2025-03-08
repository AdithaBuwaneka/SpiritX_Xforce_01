import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between mb-20">
      <h1 className="text-lg font-bold">MERN CRUD APP</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/create" className="mx-2">Add Item</Link>
      </div>
    </nav>
  );
};

export default Navbar;

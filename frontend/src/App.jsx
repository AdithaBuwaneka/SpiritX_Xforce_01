import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/edit/:id" element={<EditItem />} /> {/* Edit Route */}
      </Routes>
    </div>
  );
};

export default App;

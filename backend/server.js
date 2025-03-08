const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS


const connectDB = require("./src/config/db");
const itemRoutes = require("./src/routes/item.routes");


dotenv.config();
const app = express();


connectDB();


// Enable CORS (Allow frontend to access backend)
app.use(cors());


app.use(express.json());


app.use("/api/items", itemRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

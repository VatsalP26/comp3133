const express = require("express");
const mongoose = require("mongoose");
require( "dotenv" ).config();
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Failed:", err));

app.use("/", restaurantRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
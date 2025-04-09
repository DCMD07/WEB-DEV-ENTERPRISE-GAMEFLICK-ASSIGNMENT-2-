// Mohammed Aasim
// Assignment 2 - GameFlick
// Professor: Mr. Ram
// Course: Web Development Enterprise
// Date: April 4th, 2025

const express = require("express");
const cors = require("cors");
const app = express();
const gameRoutes = require("./routes/gameRoutes");

app.use(cors());
app.use(express.json());

// Mount routes from gameRoutes.js under /api
app.use("/api", gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

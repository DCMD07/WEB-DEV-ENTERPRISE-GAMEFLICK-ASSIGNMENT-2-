// Mohammed Aasim - Assignment 3
// Prof: Mr. Ram | Date: Feb 26

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
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

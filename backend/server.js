require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/cars"));

/**
 * 👉 FRONTEND
 * backend раздаёт frontend как статический сайт
 */
app.use(express.static(path.join(__dirname, "../frontend")));

// если пользователь заходит на /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);


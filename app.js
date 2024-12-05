const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const globalErrorHandling = require("./controllers/errorController");
const importData = require("./import");
const fs = require("fs");
const cors = require("cors");
dotenv.config({ path: ".env" });

const app = express();

// Cors Config
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow sending cookies
  })
);

// Parsing Incoming Data
app.use(express.json());
app.use(cookieParser());

//Importing data
// const data = JSON.parse(
//   fs.readFileSync("./data/workflows.json", { encoding: "utf8" })
// );
// importData(data, Workflow);

// Routes
app.use("/api/v2/categories", categoryRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/questions", questionRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;

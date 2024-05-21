require("dotenv").config();

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware for database connection
const connectDB = require("./api/config/db");

// Route Modules
const userRouter = require("./api/routes/userRouter");
const eventRouter = require("./api/routes/eventRouter");

const app = express();

// Configure app
app.use(cors());
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
})
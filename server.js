require("dotenv").config();
require("./api/strategies/locals");

// Dependencies
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

// Middleware for database connection
const connectDB = require("./api/config/db");

// Route Modules
const userRouter = require("./api/routes/userRouter");
const eventRouter = require("./api/routes/eventRouter");
const authRouter = require("./api/routes/authRouter");

const app = express();

// Configure app
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to database
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
})
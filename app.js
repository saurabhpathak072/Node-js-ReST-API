const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const productRoutes = require("./Api/routes/products");
const orderRoutes = require("./Api/routes/orders");

dotenv.config();
// ---------- Connect To MongoDB -----------
connectDB();
// -----------------------------------------

const app = express();

// ----------- MiddleWare ------------
// Logger for node js
app.use(morgan("dev"));
// To get body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// -----------------------------------

// ----------- CORS Handler ----------

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE");
    res.status(200).json({});
  }
  next();
});

// -----------------------------------

// Routes which should handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

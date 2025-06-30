const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true

}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));

if (process.env.NODE_ENV === "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Importing routes
const user = require("./controller/userController");

app.use("/api/v2/user", user);

// for errhandling
app.use(ErrorHandler);
module.exports = app;

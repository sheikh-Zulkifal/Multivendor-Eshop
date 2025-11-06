const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const path = require("path");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true

}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));


// ✅ This must be before routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


if (process.env.NODE_ENV === "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Importing routes
const user = require("./controller/userController");
const shop = require("./controller/shopController");
const product = require("./controller/productController");
const event = require("./controller/eventController");
const couponCode = require("./controller/coupounCodeController");
const payment = require("./controller/paymentController");
const order = require("./controller/orderController");
const conversation = require("./controller/conservationController");


app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/payment", payment);
app.use("/api/v2/coupon", couponCode);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);

// for errhandling
app.use(ErrorHandler);
module.exports = app;

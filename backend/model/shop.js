const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Please enter your shop address!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your shop phone number!"],
  },
  role: {
    type: String,
    default: "seller",
  },
  avatar: { type: String, required: true },
  zipCode: {
    type: Number,
    required: [true, "Please enter your shop zip code!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Shop", ShopSchema);

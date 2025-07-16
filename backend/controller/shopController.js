const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const sendShopToken = require("../utils/sendShopToken");

router.post("/create-shop", upload.single("avatar"), async (req, res, next) => {
  try {
    const filename = req?.file?.filename;
    const { email } = req.body;

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      });

      return next(new ErrorHandler("Seller already exists", 400));
    }
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
      url: fileUrl,
    },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, Please click on the link to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${seller.email} to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate Seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log("Activation token received:", req.body.activation_token);
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;
      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login seller
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all feilds", 400));
      }
      const user = await Shop.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exsits!", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Provide Correct Information!", 400));
      }
      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//  load shop

router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
        // console.log(req.user);
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("Seller not exists!", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

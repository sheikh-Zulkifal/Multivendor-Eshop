const express = require("express");
const { upload } = require("../multer");
const User = require("../model/user");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");

// Create User Route
router.post("/create-user", upload.single("avatar"), async (req, res, next) => {
  const filename = req?.file?.filename;
  console.log("Uploaded file:", filename);

  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    // Delete uploaded file
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting file" });
      }
    });
    return next(new ErrorHandler("User already exists", 400));
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
  console.log("Avatar URL:", fileUrl);

  const user = {
    name,
    email,
    password,
    avatar: {
      url: fileUrl,
    },
  };

  const activationToken = createActivationToken(user);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, Please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log("Activation token received:", req.body.activation_token);
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
"/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all feilds", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exsits!", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if(!isPasswordValid){
        return next(new ErrorHandler("Provide Correct Information!", 400));
      }
      sendToken(user,201,res)
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get("/getuser", isAuthenticated, catchAsyncErrors(async(req,res,next)=>{
  try {
    const user = await User.findById(req.user.id)
  if(!user){
    return next(new ErrorHandler("User not exists!", 400));
  }
  res.status(200).json({
    success:true,
    user
  })
  } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    
  }
}))

module.exports = router;

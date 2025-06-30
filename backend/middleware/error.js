const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server ERROR";

  // wrong db id err

  if (err.name === "CastError") {
    const message = `Resources not found to this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // duplicate key error

  if (err.name === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered `;
    err = new ErrorHandler(message, 400);
  }
  //   wrong JWT

  if (err.name === "JsonWebTokenError") {
    const message = "Your URL is invalid try later";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Your URL is expired try later";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

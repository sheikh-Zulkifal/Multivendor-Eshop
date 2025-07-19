const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const router = express.Router();

const CoupounCode = require("../model/coupounCode");


router.post("/create-coupon-code", isSeller,catchAsyncErrors(async(req,res,next)=>{
    try {
        const isCoupounCodeExist = await CoupounCode.find({
            name: req.body.name,
        })
        if(isCoupounCodeExist.length !== 0){
            return next(new ErrorHandler("Coupoun code already exists!",400));
        }
        const couponCode = await CoupounCode.create(req.body);
        res.status(201).json({
            success: true,
            couponCode
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
        
    }
}))

// get all coupoun codes

router.get("/get-coupon/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
        res.status(200).json({
            success: true,
            couponCodes,
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}));

// delete coupoun code
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
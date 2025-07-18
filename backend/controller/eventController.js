const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../model/event");
const { upload } = require("../multer");
const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const router = express.Router();


router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("ShopId is invalid!", 400));
      } else {
        const files = req.files;
        const imagesUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imagesUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");

// Create a new product
router.post(
  "/create-product",
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
        const productData = req.body;
        productData.images = imagesUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
            success:true,
            product
        })
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// get all products

router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const products = await Product.find({ shopId : req.params.id });
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
})
);

module.exports = router;
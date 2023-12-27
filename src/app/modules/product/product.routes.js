const express = require("express");
const ProductController = require("./product.controller");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  UploadImageCloudinary.single("productImage"),
  ProductController.createProduct
);
router.get("/", ProductController.getAllProduct);

module.exports = router;

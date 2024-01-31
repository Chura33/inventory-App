const express = require("express");
const {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct} = require ("../controllers/product.controller")
const ProductRouter = express.Router()
const protect = require("../middlewares/authMiddleware")
const Product = require("../models/Product");
const { upload } = require("../utils/fileUpload");


// create a product
ProductRouter.post("/", protect, upload.single("image"), createProduct)
// find all products for a specific user
ProductRouter.get("/", protect, getAllProducts)
// find a single product with it's id
ProductRouter.get("/:id", protect, getProduct)


ProductRouter.patch("/:id", protect, upload.single("image"), updateProduct)
ProductRouter.delete("/:id", protect, deleteProduct)
module.exports = ProductRouter;
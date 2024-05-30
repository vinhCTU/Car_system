const express = require("express");
const ProductCategoryController = require("../controllers/product_category");

const router = express.Router();

router.route("/create").post(ProductCategoryController.createProductCategory);

router.route("/update/:number_type").put(ProductCategoryController.updateProductCategory);

router.route("/getall").get(ProductCategoryController.getAllProductCategory);    

router.route("/detail/:number_type").get(ProductCategoryController.getDetailProductCategory);

router.route("/delete/:id").delete(ProductCategoryController.deleteProductCategory);

module.exports = router;  
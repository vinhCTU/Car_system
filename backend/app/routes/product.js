const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

//Chèn 1 sản phẩm mới vào DB: (đã chạy đúng)
router.route("/create")
    .post(productController.createProduct);

router.route("/getproduct/:type")
    .get(productController.findProductByType);


router.route("/getproduct")
    .get(productController.getProduct);

router.route("/getproducttop3month")
    .get(productController.getProductTop3Month);

router.route("/getproductstatus")
    .get(productController.getProductStatusFalse);

//Tìm thông tin chi tiết sản phẩm theo req.params.id (đã chạy đúng)
router.route("/detail/:id")
    .get(productController.findDetailProduct);


router.route("/searchproduct")
    .get(productController.searchProductByKeyword);

//Cập nhật thông tin sản phẩm 
router.route("/update/:id")
    .put(productController.updateProduct);

router.route("/delete/:id")
    .delete(productController.deleteProduct);

    router.route("/addfile")
    .post(productController.createProductlistFile);


module.exports = router;
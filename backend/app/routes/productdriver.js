const express = require("express");
const productdriverController = require("../controllers/productdriver");

const router = express.Router();

//Chèn 1 sản phẩm mới vào DB: (đã chạy đúng)
router.route("/create")
    .post(productdriverController.createProduct);

router.route("/getproduct")
    .get(productdriverController.getProduct);

router.route("/getproduct/:type")
    .get(productdriverController.findProductDriverByType);

    router.route("/getproductdrivertop3")
    .get(productdriverController.getProductDriverTop3);


//Tìm thông tin chi tiết sản phẩm theo req.params.id (đã chạy đúng)
router.route("/detail/:id")
    .get(productdriverController.findDetailProduct);

    router.route("/detailbyiddriver/:idDriver")
    .get(productdriverController.findDetailProductByIdDriver);


//Tìm sản phẩm theo tên (đã chạy đúng)
router.route("/searchproduct")
    .get(productdriverController.searchProductByKeyword);

//Cập nhật thông tin sản phẩm 
router.route("/update/:id")
    .put(productdriverController.updateProduct);

router.route("/delete/:id")
    .delete(productdriverController.deleteProduct);

    router.route("/addfile")
    .post(productdriverController.createProductDriverlistFile);


module.exports = router;
const express = require("express");
const saleController = require("../controllers/sale");

const router = express.Router();


router.route("/create")
    .post(saleController.createSale);

router.route("/getsale")
    .get(saleController.getSale);

router.route("/getsale/:type")
    .get(saleController.getSaleByType);

router.route("/update/:id")
    .put(saleController.updateSale);

    router.route("/detail/:id")
    .get(saleController.getDetailSale);

router.route("/delete/:id")
    .delete(saleController.deleteSale);


module.exports = router;
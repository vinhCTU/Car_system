const express = require("express");
const pricelistController = require("../controllers/pricelist");

const router = express.Router();


router.route("/create")
    .post(pricelistController.createPricelist);

    router.route("/addfile")
    .post(pricelistController.createPricelistFile);

router.route("/getpricelist")
    .get(pricelistController.getPricelist);

    router.route("/getpricelist/:type")
    .get(pricelistController.getPricelistByType);

    router.route("/findpricelist/:type")
    .get(pricelistController.FindPricelistByType);

router.route("/update/:id")
    .put(pricelistController.updatePricelist);

    router.route("/detail/:id")
    .get(pricelistController.getDetailPricelist);

router.route("/delete/:id")
    .delete(pricelistController.deletePricelist);


module.exports = router;
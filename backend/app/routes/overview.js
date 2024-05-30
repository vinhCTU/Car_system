const express = require("express");
const Overview = require("../controllers/overview");

const router = express.Router();



router.route("/ordertoday").get(Overview.getOrderToDay);

router.route("/ordertoday/:method").get(Overview.getOrderToDayByMethod);

router.route("/orderday/:day").get(Overview.getOrderByDaySelect);

router.route("/mostproduct/:idproduct").get(Overview.getOrderMostProduct);

router.route("/mostproductdriver/:idproduct").get(Overview.getOrderMostProductDriver);


router.route("/gettotalyear/:month").get(Overview.getOrderByYear);

router.route("/ordermonth").get(Overview.getOrderByMonth);

router.route("/ordersearch").get(Overview.getOrderMoreDaySelect);

router.route("/orderdriversearch").get(Overview.getOrderDriverMoreDaySelect);

router.route("/carcompanysearch").get(Overview.getCarcompanyMoreDaySelect);

router.route("/detailcarcompanysearch").get(Overview.getDetailCarcompanyMoreDaySelect);

router.route("/driversearch").get(Overview.getDriverMoreDaySelect);

router.route("/productsearch").get(Overview.getProductMoreDaySelect);

router.route("/whereendsearch").get(Overview.getWhereendSelect);

router.route("/productdetailsearch").get(Overview.getDetailProductMoreDaySelect);


router.route("/customersearch").get(Overview.getCustomerMoreDaySelect);

router.route("/ordermonth/:month").get(Overview.getOrderByMonthSelect);

router.route("/ordercomplete/:phonenumber").get(Overview.getOverviewByPhoneNumber);

router.route("/comment/:id").put(Overview.commentProduct);

router.route("/commentsearch").get(Overview.getCommentMoreDaySelect);

router.route("/detail/:id").get(Overview.getOverviewById);

router.route("/ordercomplete").get(Overview.getOrderComlplete);

router.route("/commentlist/:id").get(Overview.getCommentListById);

router.route("/ordernumber/:ordernumber").get(Overview.getOrderByOrderNumber);

router.route("/getdriverlistmonth/:id").get(Overview.getDriverListByMonth);

router.route("/getordercompletebyday").get(Overview.getOrderCompleteByDay);

module.exports = router;
const express = require("express");
const Order = require("../controllers/order");

const router = express.Router();


router.route("/create")
    .post(Order.createOrder);

    router.route("/createorderonline")
    .post(Order.createOrderOnline);

router.route("/createordernewcustomer")
    .post(Order.createOrderNewCustomer);


router.route("/")  
    .get(Order.getAllOrder);

router.route("/getorderonline")  
    .get(Order.getOrderOnline);


router.route("/findproductfit")  
    .get(Order.findProductFit);

    router.route("/findproductdriverfit")  
    .get(Order.findDriverProductFit);


router.route("/detail/:id")
    .get(Order.getOrderById);

    router.route("/detailofdriver/:iddriver")
    .get(Order.getOrderByIdDriver);

router.route("/detailofproduct/:idproduct")
    .get(Order.getOrderByIdProduct);

    router.route("/method/:method")
    .get(Order.getOrderByMethod);
    

router.route("/emaildriver/:emaildriver") 
    .get(Order.getOrderByEmail);

router.route("/update/:id")
    .put(Order.updateOrder);


router.route("/complete/:id")
    .post(Order.completeOrder);

    router.route("/completeorderdriver/:id")
    .post(Order.completeOrderDriver);

router.route("/delete/:id")
    .post(Order.deleteOrder);

    router.route("/deleteorderdriver/:id")
    .post(Order.deleteOrderDriver);


router.route("/phonenumber/:phonenumber")
    .get(Order.getOrderByPhoneNumber);

    router.route("/phonenumberordertrue/:phonenumber")
    .get(Order.getOrderByPhoneNumberStatusTrue);


    router.route("/phonenumberorderfalse/:phonenumber")
    .get(Order.getOrderByPhoneNumberStatusFalse);




    router.route("/sendemail")
    .post(Order.sendEmail);


module.exports = router;    
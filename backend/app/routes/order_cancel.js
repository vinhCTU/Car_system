const express = require("express");
const OrderCancel = require("../controllers/order_cancel");

const router = express.Router();


// router.route("/create")
//     .post(Order.createOrder);

// router.route("/createordernewcustomer")
//     .post(Order.createOrderNewCustomer);


router.route("/")  
    .get(OrderCancel.getAllOrder);

router.route("/deleteordercancel/:id")  
    .put(OrderCancel.deleteOrderCancelCustomer);



// router.route("/detail/:id")
//     .get(Order.getOrderById);

//     router.route("/detailofdriver/:iddriver")
//     .get(Order.getOrderByIdDriver);

// router.route("/detailofproduct/:idproduct")
//     .get(Order.getOrderByIdProduct);

//     router.route("/method/:method")
//     .get(Order.getOrderByMethod);
    

// router.route("/emaildriver/:emaildriver") 
//     .get(Order.getOrderByEmail);

// router.route("/update/:id")
//     .put(Order.updateOrder);


// router.route("/complete/:id")
//     .post(Order.completeOrder);

//     router.route("/completeorderdriver/:id")
//     .post(Order.completeOrderDriver);

// router.route("/delete/:id")
//     .post(Order.deleteOrder);

//     router.route("/deleteorderdriver/:id")
//     .post(Order.deleteOrderDriver);


router.route("/phonenumber/:phonenumber")
    .get(OrderCancel.getOrderCancelByPhoneNumber);

module.exports = router;    
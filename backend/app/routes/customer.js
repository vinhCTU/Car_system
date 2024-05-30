const express = require("express");
const Customer = require("../controllers/customer");

const router = express.Router();


router.route("/create").post(Customer.create);
 
router.route("/login")
    .post(Customer.login);

    router.route("/checkcustomer")
    .post(Customer.check_customer);


router.route("/getcustomer")
    .get(Customer.getCustomer);


router.route("/getcustomertop5")
    .get(Customer.getCustomerTop5Month);

router.route("/detail/:id")
    .get(Customer.getOneCustomer);

router.route("/updatecustomer/:id")
    .put(Customer.updateCustomerProfile);

router.route("/updatepassword/:phonenumber")
    .put(Customer.updateCustomer);


router.route("/updatepasswordcustomer/:id")
    .put(Customer.updatePassword);

router.route("/getcustomer/:email")
    .get(Customer.getCustomerByEmail);

    router.route("/phonenumber/:phonenumber")
    .get(Customer.getCustomerByPhoneNumber);

router.route("/delete/:id")
    .delete(Customer.deleteCustomer);

module.exports = router;
const express = require("express");
const Contact = require("../controllers/contact");

const router = express.Router();


router.route("/create").post(Contact.create);
 

router.route("/getcontact")
    .get(Contact.getContact);

    router.route("/getreplaycustomer/:phonenumber")
    .get(Contact.getReplayCustomer);


router.route("/repcustomer/:id")
    .put(Contact.repCustomer);

// router.route("/detail/:id")
//     .get(Customer.getOneCustomer);

// router.route("/updatecustomer/:id")
//     .put(Customer.updateCustomerProfile);

// router.route("/updatepassword/:phonenumber")
//     .put(Customer.updateCustomer);


// router.route("/updatepassword/:id")
//     .put(Customer.updatePassword);

// router.route("/getcustomer/:email")
//     .get(Customer.getCustomerByEmail);

//     router.route("/phonenumber/:phonenumber")
//     .get(Customer.getCustomerByPhoneNumber);

// router.route("/delete/:id")
//     .delete(Customer.deleteCustomer);

module.exports = router;
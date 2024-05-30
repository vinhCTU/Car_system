const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        email: {
            type: String,
        },
        phonenumber: {
            type: String,
            minlength: 10,
        },
        cic:{
            type: String,
           
        },
        password: {
            type: String,
            default: ""
        },
        address:{
            type: String,
            
        },
        total_month:{
            type: Number,   
            default: 0
        },
        discount:{
            type: Number,   
            default: 0
        },
        count_order:{
            type: Number,   
            default: 0
        }


    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Customer", customerSchema);
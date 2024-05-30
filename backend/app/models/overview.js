const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },    
        phonenumber: {
            type: String,
            require: true,
            minlength: 10,
        },
        address: {
            type: String,
            require: true,
        },
        cic:{
            type: String,
        },
        discount:{
            type: Number,
            default: 0
        },
        rentcost:{
            type: Number,
        },
        surcharge:{
            type: String
        },
        total: {
            type: Number,
            require: true,
        },
        
        payment: {
            type: String,
            require: true,
            default: "Thanh toán tiền mặt",
        },
        method:{
            type: String,
            require: true
        },
        type:{
            type:String
        },
        driverlicense: {
            type: String,
        },
        
        driver:{
            type: String,
        },
        daystart:{
            type: Date,
            require: true
        },
        dayend:{
            type: Date,
            require: true
        },
        wherestart:{
            type: String,
        },
        whereend:{
            type: String,
        },
        product:{
            type: String
        },
        color:{
            type: String
        },

        idproduct:{
            type: String
        },

        iddriver:{
            type: String
        },
        emaildriver:{
            type: String
        },      
        note: {
            type: String,
        },  
        star:{
            type: Number
        },      
        comment: {
            type: String,
            default: ""
        },  
        state_comment: {
            type: Boolean,
            default: false
        },  
        ordernumber:{
            type: Number,
        }


        
       
    },
    {timestamps: true}
);

module.exports = mongoose.model("Overview", overviewSchema);
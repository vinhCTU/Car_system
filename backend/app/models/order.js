const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
        note: {
            type: String,
        },
        discount:{
            type: Number,
            default: 0
        },
        rentcost:{
            type: Number,
            default: 0
        },
        surcharge:{
            type: String,
            default: 0
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
        cic:{
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
        specific_address: {
            type: String,
            require: true,
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
        isOnline:{
            type: Boolean,
            default: false
        },
        status:{
            type: String,
            default: "Chờ xử lí"
        },

        reasonCancel:{
            type: String,
        },

        license_plate:{
            type: String
        },
        
        goal_order:{
            type: String
        }
        

        
        // product:[
        //     {type: mongoose.Types.ObjectId, ref: 'Product'}
        // ],
        // user: [
        //     {type: mongoose.Types.ObjectId, ref: 'User'}
        // ],
        

    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const ordercancelSchema = new mongoose.Schema(
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
            default: "Đã hủy"
        },
        reasonCancel:{
            type: String,
        },
        isDelete:{
            type: Boolean,
            default: false
        },
        
        // product:[
        //     {type: mongoose.Types.ObjectId, ref: 'Product'}
        // ],
        // user: [
        //     {type: mongoose.Types.ObjectId, ref: 'User'}
        // ],
        

    },
    {timestamps: true}
);

module.exports = mongoose.model("OrderCancel", ordercancelSchema);
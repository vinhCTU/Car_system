const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true, 
        },
        email: {
            type: String,
            require: true,
            unique: true,      
        },
        phonenumber: {
            type: String,
            require: true,
            minlength: 10,
        },
        password: {
            type: String
        },

        order: [
            {type: mongoose.Types.ObjectId, ref: 'Order'}
        ],

        dayofbirth:{
            type: Date,
            require: true
        },
        address:{
            type: String,
            require: true
        },
        driverlicense:{
            type: String,
            require: true
        },
        status:{
            type: Boolean,
            require: true,
            default: false
        },
        sex:{
            type:String,
            require: true,
        },
        cic:{
            type: String,
            require: true,
        },
        avartar:{
            type: String,
        },
        isDriver:{
            type: Boolean,
            default: false,
        },
        isStaff:{
            type: Boolean,
            default: false,
        },
        total_month:{
            type: Number,
            default: 0
        },
        salary:{
            type: Number,
            default: 0
        },
        percent_total:{
            type: Number,
            default: 0
        },
        reward:{
            type: Number,
            default: 0
        },
        salary_total:{
            type: Number,
            default: 0
        },
        idProduct: {
            type: String,
        },
        count_order: {
            type: Number,
            default: 0
        }
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
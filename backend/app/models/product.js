const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    
    {
        name: {
            type: String,
            require: true,
        },
        imageURL: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        type: {
            type: Number,
            require: true,
        },
        type_car: {
            type: String
        },
        method:{
            type: String,
            require: true
        },
        color: {
            type: String,
            require: true,
        },
        carcompany: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            
        },
        amountingarage: {
            type: Number,
            
        },
        description: {
            type: String,
        },
        total_month: {
            type: Number,
            default: 0
        },
        vehical_id: {
            type: String
        },
        
        license_plate: {
            type: String
        },
        date_range:{
            type: Date
        },
        
        expiration_date:{
            type: Date
        }
        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);
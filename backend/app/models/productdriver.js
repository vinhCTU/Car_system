const mongoose = require("mongoose");

const productdriverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        imageURL: {
            type: String,
            require: true,
        },
        type: {
            type: Number,
            require: true
        },
        color: {
            type: String,
            require: true
        },
        carcompany: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
            default: "Còn xe",
        },
        amountingarage: {
            type: Number,
            default:"1",
            require: true,
        },
        driver:{
            type: String,
            require: true
        },
        idDriver: {
            type: String,
            require: true
        },
       
        description: {
            type: String,
            require: true,
        },
        total_month:{
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

module.exports = mongoose.model('ProductDriver', productdriverSchema);
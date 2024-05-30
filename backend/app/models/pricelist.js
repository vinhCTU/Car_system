const mongoose = require("mongoose");

const pricelistSchema = new mongoose.Schema(
    {
        wherestart:{
            type: String,
            require: true,
            default: "Cần Thơ"
        },
        whereend: {
            type: String,
            require: true, 
        },
        type:{
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true  
        }
       
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Pricelist", pricelistSchema);
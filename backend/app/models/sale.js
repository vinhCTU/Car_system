const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        startsale:{
            type: Date,
            require: true,
        },
        endsale: {
            type: Date,
            require: true, 
        },
        type: {
            type: Number,
            require: true, 
            default: ""
        },
        method: {
            type: Number,
            require: true, 
            default: 0
        },
        percentsale:{
            type: Number,
            default: 0
        },
       
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Sale", saleSchema);
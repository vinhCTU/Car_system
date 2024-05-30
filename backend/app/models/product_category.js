const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
    type: {
        type: Number,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("ProductCategory", productCategorySchema);
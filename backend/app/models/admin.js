const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            default: true
        },
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Admin", adminSchema);
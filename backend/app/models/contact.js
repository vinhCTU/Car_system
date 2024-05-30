const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        phonenumber: {
            type: String,
            minlength: 10,
        },
        contact: {
            type: String,
        },
        replay:{
            type: String
        },
        status:{
            type: String,
            default: "Chưa trả lời"
        }

    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Contact", contactSchema);
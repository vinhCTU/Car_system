const bcrypt = require("bcrypt");
const Contact = require("../models/contact");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');



//Đăng ký tài khoản (đã chạy đúng)
const create = async (req, res, next) => { 
    try{
        
        
        const newContact = await new Contact({
            name: req.body.name,
            phonenumber: req.body.phonenumber,
            contact: req.body.contact,
        });

        // Lưu vào DB
        const contact = await newContact.save();
        return res.send(contact);//trả về thông tin user vừa tạo
    }catch(err){
        // return next(new ApiError(500,"Có lỗi xảy ra khi đăng ký tài khoản"));
        return next({message: err})
    }
};

const getContact = async (req, res, next) => {
    
    try{    
        const status_contact = req.query.status

        if(status_contact === ""){
            const contact = await Contact.find().sort({"status": 1});
            return res.send(contact);
        }

        if(status_contact != ""){
            const contact = await Contact.find({status: status_contact}).sort({"createdAt": 1});
            return res.send(contact);
        }


        
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tinphanr hooif"));
    }
}

const repCustomer = async (req, res, next) => {
    try{
        const updateDoc = {
            replay: req.body.replay,
            status: "Đã trả lời"
        };
        console.log(req.params.id)
        
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update = await Contact.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật câu trả lời!"));  
    }
}

const getReplayCustomer = async (req, res, next) => {
    try{    
        const contact = await Contact.find({phonenumber: req.params.phonenumber}).sort({"createdAt": -1}).limit("5");
        return res.send(contact);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tinphanr hooif"));
    }
}


module.exports = { create, getContact, repCustomer, getReplayCustomer}
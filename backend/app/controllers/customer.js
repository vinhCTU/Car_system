const bcrypt = require("bcrypt");
const Customer = require("../models/customer");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');

 
const registerCustomer = async (req, res, next) => { 
    try{
        //hash password do người dùng nhập vào
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Tìm kiếm xem có email bị trùng không
        const phoneExist = await User.findOne({phonenumber: req.body.phonenumber});
        if(phoneExist){
            return next(new ApiError(400,"Số điện thoại đã tồn tại, hãy dùng email khác!"));
        }
 
        
        const newUser = await new User({
            name: req.body.name,
            phonenumber: req.body.phonenumber,
            password: hashed,
        });

        // Lưu vào DB
        const user = await newUser.save();
        return res.send(user);//trả về thông tin user vừa tạo
    }catch(err){
        // return next(new ApiError(500,"Có lỗi xảy ra khi đăng ký tài khoản"));
        return next({message: err})
    }
};

//Đăng ký tài khoản (đã chạy đúng)
const create = async (req, res, next) => { 
    try{
        //hash password do người dùng nhập vào
        // const salt = await bcrypt.genSalt(10);
        // const hashed = await bcrypt.hash(req.body.password, salt);

        // //Tìm kiếm xem có email bị trùng không
        // const emailExist = await Customer.findOne({email: req.body.email});
        // if(emailExist){
        //     return next(new ApiError(400,"Email đã tồn tại, hãy dùng email khác!"));
        // }

        // // else if(confirmPassword != password ){
        // //     return next(new ApiError(400,"Mật khẩu nhập lại không khớp!"));
        // // }

        
        const newCustomer = await new Customer({
            cic: req.body.cic,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
        });

        // Lưu vào DB
        const customer = await newCustomer.save();
        return res.send(customer);//trả về thông tin user vừa tạo
    }catch(err){
        // return next(new ApiError(500,"Có lỗi xảy ra khi đăng ký tài khoản"));
        return next({message: err})
    }
};

const check_customer = async (req, res, next) => {
    try{
        const customer = await Customer.findOne({phonenumber: req.body.phonenumber});
        if(customer.password === ""){
            return next(new ApiError(400,"Cần cập nhật mật khẩu"));
        }
        return res.send(customer);
    }catch(error){
        return next(
            error
        );
    }
};

const login = async (req, res, next) => {
    try{
        const customer = await Customer.findOne({phonenumber: req.body.phonenumber});
        if(!customer){
            return next(new ApiError(400,"Số điện thoại chưa được đăng ký"));
        }
        

        // const accessToken = generateAccessToken(user._id, role)
        const validPassword = await bcrypt.compare(req.body.password, customer.password);   
        //Nếu password không đúng
        if(!validPassword){
            return next(new ApiError(400,"Sai mật khẩu"));
        }
        //Nếu cả email và password đúng
        if(customer && validPassword){
            return res.send(customer);
        }
    }catch(error){
        return next(
            error
        );
    }
};

const createCustomer = async (req, res, next) => {
    const customerInfo = new Customer(req.body); 
    try{
        const newCustomer = await customerInfo.save();
        return res.send(newCustomer);
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi thêm khách hàng!"));
    }
}

const updateCustomerProfile = async (req, res, next) => {
    try{
        const options = {returnDocument: "after"};
        const updateDoc = {
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            cic : req.body.cic,
            discount : req.body.discount,
            rentcost : req.body.rentcost
        }

        const customerProfileUpdate = await Customer.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(customerProfileUpdate);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin tài khoản"));
    }
}

const updateCustomer = async (req, res, next) => {
    try{
        const phone = req.params.phonenumber;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const options = {returnDocument: "after"};
        const updateDoc = {
            password: hashed,
        };
        const customerUpdate = await Customer.findOneAndUpdate({phonenumber: phone}, updateDoc, options);
        return res.send(customerUpdate);
    }catch(error){
        return next(error);
    }
}
//Cập nhật mật khẩu (đã chạy đúng)
const updatePassword = async (req, res, next) => {
    try{
        const current_password = req.body.current_password;
        console.log(req.body.current_password)
        
        const customer_info = await Customer.findById(req.params.id);
        console.log(customer_info)
        const validPassword = await bcrypt.compare(current_password, customer_info.password);
        
        if(validPassword){
            const new_password = req.body.new_password;
            console.log(new_password)
            
            //hash password do người dùng nhập vào
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(new_password, salt);
            
     
            const options = {returnDocument: "after"};
            const updateDoc = {
                password: hashed,
            };
            const update_password = await Customer.findByIdAndUpdate(req.params.id, updateDoc, options);
            return res.send(update_password);
        }else{
            return next(new ApiError(400,"Mật khẩu hiện tại bạn nhập không đúng"));    
        }
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi đổi mật khẩu"));
    }
}

const getCustomer = async (req, res, next) => {
    try{    
        const key = req.query.key
        if(key === ""){
            const customer = await Customer.find().sort({"total_month": -1});
            return res.send(customer);
        }
        
        if(key != ""){
            const customer = await Customer.find({
                "$or":[
                    {name: {$regex:req.query.key,  $options: 'i'}},
                    {phonenumber: {$regex:req.query.key,  $options: 'i'}},
                    {address: {$regex:req.query.key,  $options: 'i'}},
                    {color: {$regex:req.query.key,  $options: 'i'}},
                ]
            }).sort({"total_month": -1});
            return res.send(customer);
        }
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
    }
}

const getCustomerTop5Month = async (req, res, next) => {
    try{    
        const customer = await Customer.find().sort({"total_month": -1}).limit(5);
        return res.send(customer);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
    }
}

const getCustomerByEmail = async (req, res, next) => {
    try{    
        const userAccount = await User.find({email:req.params.email});
        return res.send(userAccount); 
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
    }

}
// }
// const getAccount = async (req, res, next) => {
//     try{    
//         const inputEmail = req.params.email;
//         if(inputEmail == "all"){
//             const userAccount = await User.find({isAdmin: false});
//             return res.send(userAccount);
//         }else{
//             const userAccount = await User.findOne({email: inputEmail});
//             return res.send(userAccount);
//         }
//     }catch(error){
//         return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
//     }
// }

const getOneCustomer = async (req, res, next) => {
    try{    
        const id_customer = req.params.id
        const customerAccount = await Customer.findById(id_customer);
        return res.send(customerAccount);
    }catch(error){
        return next(error);
    }
}

const getCustomerByPhoneNumber = async(req, res, next) => {
    try {
        const list_order = await Customer.findOne({ phonenumber: req.params.phonenumber });
        // if(list_order === ""){
        //     return next(new ApiError(500,"Không tìm thấy thông tin khách hàng!"));
        // }
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500,"Có lỗi xảy ra khi tìm thông tin khách hàng!"));
    }
}


const deleteCustomer = async (req, res, next) => {
    try{
        const getId = req.params.id;
        const deleteAccount = await Customer.findByIdAndDelete(getId);
        return res.send(deleteAccount);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa tài khoản người dùng"));
    }
}

module.exports = { create, login,getCustomerByEmail, check_customer, getCustomer,updatePassword,getCustomerByPhoneNumber, updateCustomer, updateCustomerProfile, getCustomerTop5Month , getOneCustomer,deleteCustomer}
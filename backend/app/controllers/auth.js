const bcrypt = require("bcrypt");
const User = require("../models/auth");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');
const multer = require('multer')



 

//Đăng ký tài khoản (đã chạy đúng)
const register = async (req, res, next) => { 
    try{
        //hash password do người dùng nhập vào
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Tìm kiếm xem có email bị trùng không
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return next(new ApiError(400,"Email đã tồn tại, hãy dùng email khác!"));
        }

        // else if(confirmPassword != password ){
        //     return next(new ApiError(400,"Mật khẩu nhập lại không khớp!"));
        // }

        //tạo user
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
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

const registerStaff = async (req, res, next) => { 
    try{
        //hash password do người dùng nhập vào
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Tìm kiếm xem có email bị trùng không
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return next(new ApiError(400,"Email đã tồn tại, hãy dùng email khác!"));
        }

        // else if(confirmPassword != password ){
        //     return next(new ApiError(400,"Mật khẩu nhập lại không khớp!"));
        // }

        //tạo user
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: hashed,
            isStaff: true
        });

        // Lưu vào DB
        const user = await newUser.save();
        return res.send(user);
    }catch(err){
        return next({message: err})
    }
};

const registerUser = async (req, res, next) => { 
    try{
        //hash password do người dùng nhập vào
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        //Tìm kiếm xem có email bị trùng không
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return next(new ApiError(400,"Email đã tồn tại, hãy dùng email khác!"));
        }
 
        
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: hashed,
            isDriver: true
        });

        // Lưu vào DB
        const user = await newUser.save();
        return res.send(user);//trả về thông tin user vừa tạo
    }catch(err){
        // return next(new ApiError(500,"Có lỗi xảy ra khi đăng ký tài khoản"));
        return next({message: err})
    }
};
 
// const generateAccessToken = (uid, role) => jwt.sign({_id: uid, role}, process.env.JWT_SECRET, {expiresIn: '3d'})


// const isAdmin = async(req, res, next)=> {
//     try{
//         const {role} = req.data
//         if(role !== 'admin'){
//             return res.send(new ApiError("Khong phai admin"))
//         }
//     }catch(error){
//         return next(err)
//     }
// }
const login = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(new ApiError(400,"Email chưa được đăng ký"));
        }


        // const accessToken = jwt.sign(user, 'bookcar')
       
        const validPassword = await bcrypt.compare(req.body.password, user.password);   
        //Nếu password không đúng
        if(!validPassword){
            return next(new ApiError(400,"Sai mật khẩu"));
        }
        //Nếu cả email và password đúng
        if(user && validPassword){
            return res.send(user);
        }

        // return res.send(accessToken)
    }catch(error){
        return next(
            error
        );
    }
};

const loginDriver = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const check_driver = await User.findOne({isDriver: req.body.isDriver})
        if(!user){
            return next(new ApiError(400,"Email chưa được đăng ký"));
        }

        // if(check_driver === false){
        //     return next(new ApiError(400,"Không phải tài xế"));
        // }

        const validPassword = await bcrypt.compare(req.body.password, user.password);   
        //Nếu password không đúng
        if(!validPassword){
            return next(new ApiError(400,"Sai mật khẩu"));
        }

        //Nếu cả email và password đúng
        if(user && check_driver === true && validPassword ){
            return res.send(user);
        }
    }catch(error){
        return next(
            error
        );
    }
};

//Cập nhật thông tin tài khoản (đã chạy đúng)
const updateUserProfile = async (req, res, next) => {
    try{
        const options = {returnDocument: "after"};
        const updateDoc = req.body
        const userProfileUpdate = await User.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(userProfileUpdate);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin tài khoản"));
    }
}

const updateDriver = async (req, res, next) => {
    try{
       
        if(req.body.status === "false"){
            const options = {returnDocument: "after"};
            const updateDoc = req.body
            const updateId = {
                idProduct: ""
            }
            const DriverUpdate = await User.findByIdAndUpdate(req.params.id, updateDoc, options);
            const DriverDeleteId = await User.findByIdAndUpdate(req.params.id, updateId, options);
            return res.send(DriverUpdate);
        }
        else{
            const options = {returnDocument: "after"};
            const updateDoc = req.body
            const DriverUpdate = await User.findByIdAndUpdate(req.params.id, updateDoc, options);
            return res.send(DriverUpdate);
        }
       
    }catch(error){
        return next(error);
    }
}
//Cập nhật mật khẩu (đã chạy đúng)
const updatePassword = async (req, res, next) => {
    try{
        const current_password = req.body.current_password;
        const user_info = await User.findById(req.params.id);
        const validPassword = await bcrypt.compare(current_password, user_info.password);

        if(validPassword){
            const new_password = req.body.new_password;
            
            //hash password do người dùng nhập vào
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(new_password, salt);
            
            //Tiến hành cập nhật vào CSDL
            const options = {returnDocument: "after"};
            const updateDoc = {
                password: hashed,
            };
            const update_password = await UserModel.findByIdAndUpdate(req.params.id, updateDoc, options);
            return res.send(update_password);
        }else{
            return next(new ApiError(400,"Mật khẩu hiện tại bạn nhập không đúng"));    
        }
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi đổi mật khẩu"));
    }
}

const getUser = async (req, res, next) => {
    try{    
        const user = await User.find({isStaff: true});
        return res.send(user);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
    }
}


//Lấy danh sách tài khoản người dùng (tất cả hoặc 1 tài khoản cụ thể theo email)
const getAccount = async (req, res, next) => {
    try{    
        const inputEmail = req.params.email;
        if(inputEmail == "all"){
            const userAccount = await User.find({isAdmin: false});
            return res.send(userAccount);
        }else{
            const userAccount = await User.findOne({email: inputEmail});
            return res.send(userAccount);
        }
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản người dùng"));
    }
}

const getOneStaff = async (req, res, next) => {
    try{    
        const id_staff = req.params.id;
            const userAccount = await User.findById(id_staff);
            return res.send(userAccount);
    }catch(error){
        return next(error);
    }
}


const getOneDriver = async (req, res, next) => {
    try{    
        const id_driver = req.params.id;
            const userAccount = await User.findById(id_driver);
            return res.send(userAccount);
    }catch(error){
        return next(error);
    }
}

const getDriver = async (req, res, next) => {
    try{    
        const key = req.query.key
        if(key === ""){
            const userDriver = await User.find({isDriver: true}).sort({"total_month": -1});
            return res.send(userDriver);
        }

        if(key != ""){
            const userDriver = await User.find({
                isDriver: true,
                "$or":[
                    {name: {$regex:req.query.key,  $options: 'i'}},
                    {phonenumber: {$regex:req.query.key,  $options: 'i'}},
                    {address: {$regex:req.query.key,  $options: 'i'}},
                    {driverlicense: {$regex:req.query.key,  $options: 'i'}},
                ]
            }).sort({"total_month": -1});
            return res.send(userDriver);
        }
        
        
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản taif xees"));
    }
}

const getDriverTop3 = async (req, res, next) => {
    try{    
        const userDriver = await User.find({isDriver: true}).sort({"total_month": -1}).limit(3);
        return res.send(userDriver);
        
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản taif xees"));
    }
}

const getDriverStatus = async (req, res, next) => {
    try{    
        const userDriver = await User.find({status: false});
        return res.send(userDriver);
        
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin tài khoản tai xe"));
    }
}

//Xóa tài khoản người dùng khỏi DB
const deleteAccount = async (req, res, next) => {
    try{
        const getId = req.params.id;
        const deleteAccount = await User.findByIdAndDelete(getId);
        return res.send(deleteAccount);
        // res.status(400).json("Xóa thành công");
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa tài khoản người dùng"));
    }
}

module.exports = { 
    register,
    registerUser,
    login,
    loginDriver, 
    updateUserProfile, 
    updateDriver,getDriver,
    getDriverStatus, 
    getOneDriver, 
    updatePassword, 
    getAccount,
    getUser,
    getDriverTop3, 
    deleteAccount,
    getOneStaff,
    registerStaff
}
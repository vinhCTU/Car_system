const Order = require("../models/order");
const Product = require("../models/product");
const ProductDriver = require("../models/productdriver");
const Overview = require("../models/overview");
const Customer = require("../models/customer");
const OrderCancel = require("../models/order_cancel");
const User = require("../models/auth");
const ApiError = require("../api-error");

const nodemailer = require("nodemailer");

//Tạo đơn hàng (đã chạy đúng)
const createOrder = async(req, res, next) => {
    const OrderInfo = new Order(req.body);
    
    try {
        

        const customer = await Customer.findOne({phonenumber: req.body.phonenumber})
       

        const start = new Date(req.body.daystart)
        const day_start = start.getDate()+"-"+(start.getMonth()+1)+'-'+start.getFullYear()
        const end = new Date(req.body.dayend)
        const day_end = end.getDate()+"-"+(end.getMonth()+1)+'-'+end.getFullYear()

        //Chạy vòng lặp trừ amountinstock trong products ra
        //Đầu tiên lấy thông tin các sản phẩm sẽ được thêm vào order ra 
        // const list_products_in_cart = req.body.products;

        // for (let i = 0; i < list_products_in_cart.length; i++) {

        //     //Lấy thông tin sản phẩm 
        //     const infoProduct = await Product.findById(list_products_in_cart[i]._id);

        //     const options = { returnDocument: "after" };
        //     //Dữ liệu sẽ được cập nhật
        //     const updateData = {
        //         productname: infoProduct.productname,
        //         price: infoProduct.price,
        //         type: infoProduct.type,
        //         description: infoProduct.description,
        //         color: infoProduct.color,
        //         brand: infoProduct.brand,
        //         imageURL: infoProduct.imageURL,
        //         origin: infoProduct.origin,
        //         amountinstock: infoProduct.amountinstock - list_products_in_cart[i].quantity,
        //     }

            // const productUpdate = await Product.findByIdAndUpdate(list_products_in_cart[i]._id, updateData, options);
        // }

        // const options = {returnDocument: "after"};
        // const updateDoc = req.body
        // const customerUpdate = await Customer.findOneAndUpdate(req.params.phonenumber, updateDoc, options);

        // const email = customer.email;

        // var smtpTransport = nodemailer.createTransport({
        //     service: "Gmail",
        //     auth: {
        //         user: "nhot2telecom@gmail.com",
        //         pass: "zyed hwvf mpus vtyf",
        //     }
        // });
        
        // // setup e-mail data with unicode symbols
        // var mailOptions = {
        //     from: 'nhot2telecom@gmail.com', // sender address
        //     to: email, // list of receivers
        //     subject: `Xin chào ${req.body.name}`, // Subject line
        //     text: `Quá trình đặt xe của bạn đã thành công!!! Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!`, // plaintext body
        //     html: `<b>Lên lịch thành công!</b><br /> <p>Bạn đã thuê thành công xe ${req.body.product} đi từ ngày ${day_start} đến ngày ${day_end} với giá ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(req.body.total)}</p>`
        // }
        
        // // send mail with defined transport object
        // smtpTransport.sendMail(mailOptions, function(error, response){
        //     if(error){
        //         console.log(error);
        //     }else{
        //         console(response)
        //     }
        // });

        const newOrder = await OrderInfo.save();
        return res.send(newOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi tạo đơn hàng"));
    }
}
const createOrderOnline = async(req, res, next) => {
    const OrderInfo = new Order(req.body);
    try {
        const newOrder = await OrderInfo.save();
        return res.send(newOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi tạo đơn hàng"));
    }
}
const createOrderNewCustomer = async(req, res, next) => {
    try {
        const OrderInfo = new Order(req.body);
        const newCustomer = await new Customer({
            name: req.body.name,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            cic: req.body.cic
        });
        const createOrder = await OrderInfo.save();
        const customercreate = await newCustomer.save();


        return res.send(customercreate);
    } catch (error) {
        return next(error);
    }
}

//Lấy tất cả đơn hàng (đã chạy đúng)
const getAllOrder = async(req, res, next) => {
    try {
        const order_list = await Order.find();
        return res.send(order_list);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

//Lấy đơn hàng theo mã đơn hàng 
const getOrderById = async(req, res, next) => {
    try {
        const detailOrder = await Order.findById(req.params.id);
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

const getOrderByIdProduct = async(req, res, next) => {
    try {
        const detailOrder = await Order.find({idproduct: req.params.idproduct});
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

// Lấy danh sách đơn hàng theo hình thức
const getOrderByMethod = async(req, res, next) => {
    try {
        const key = req.query.key
        if( key === ""){
            const Order_detail = await Order.find({method: req.params.method}).sort({"status": 1});
            return res.send(Order_detail);
        }

        if( key != ""){
            const Order_detail = await Order.find({
                method: req.params.method,
                "$or":[
                    {name: {$regex:req.query.key,  $options: 'i'}},
                    {product: {$regex:req.query.key,  $options: 'i'}},
                    {color: {$regex:req.query.key,  $options: 'i'}},
                    {phonenumber: {$regex:req.query.key,  $options: 'i'}},
                    {whereend: {$regex:req.query.key,  $options: 'i'}},
                    {address: {$regex:req.query.key,  $options: 'i'}},
                    {driverlicense: {$regex:req.query.key,  $options: 'i'}},
                    {status: {$regex:req.query.key,  $options: 'i'}},
                    // {: {$regex:req.query.keyword,  $options: 'i'}},
                ]
            }).sort({"status": 1});
            return res.send(Order_detail);
        }
        
    } catch (error) {
        return next(error);
    }
}

const getOrderOnline = async(req, res, next) => {
    try {
        const Order_detail = await Order.find({isOnline: true});
        return res.send(Order_detail);
    } catch (error) {
        return next(error);
    }
}

//Lấy danh sách đơn hàng theo email
const getOrderByEmail = async(req, res, next) => {
    try {
            const list_of_order_by_email = await Order.find({ 
                emaildriver: req.params.emaildriver, 
                status: "Đã lên lịch"
            });
            return res.send(list_of_order_by_email);
     
        
    } catch (error) {
        return next(error);
    }
}


//Update đơn hàng theo id
const updateOrder = async(req, res, next) => {
    try {
        const order_info = await Order.findById(req.params.id)
        const options = { returnDocument: "after" };
        
        // const customer = await Customer.findOne({phonenumber: req.body.phonenumber})
        // console.log(customer.email)
        const order_update = await Order.findByIdAndUpdate(req.params.id, req.body, options)


        const start = new Date(order_info.daystart)
        const day_start = start.getDate()+"-"+(start.getMonth()+1)+'-'+start.getFullYear()
        const end = new Date(order_info.dayend)
        const day_end = end.getDate()+"-"+(end.getMonth()+1)+'-'+end.getFullYear()
      
    
        if(req.body.status === "Đã lên lịch"){
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "nhot2telecom@gmail.com",
                    pass: "zyedhwvfmpusvtyf",
                }
            });
            
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: 'nhot2telecom@gmail.com', // sender address
                to: "quocvinhh1311@gmail.com", 
                subject: `Xin chào ${order_info.name}`, // Subject line
                text: `Quá trình đặt xe của bạn đã thành công!!! Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!`, // plaintext body
                html: `<b>Lên lịch thành công!</b><br /> <p>Bạn đã thuê thành công xe ${order_info.product} đi từ ngày ${day_start} đến ngày ${day_end} với giá ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order_info.total)}</p>`
            }
            
            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console(response)
                }
            });
        }

        return res.send(order_update);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi cập nhật thông tin đơn hàng"));
    }
}

//Hoàn tất đơn hàng
const completeOrderDriver = async(req, res, next) => {
    try {
        const get_order = await Order.findById(req.params.id);
        const list_order_number =await Overview.findOne({}, {}, {sort: {'createdAt': -1}})
        const phonenumber_customer = get_order.phonenumber
       


        const newOverview = new Overview({
            name: get_order.name,
            phonenumber: get_order.phonenumber,
            address: get_order.address,
            cic: get_order.cic,
            discount: get_order.discount,
            rentcost: get_order.rentcost,
            surcharge: get_order.surcharge,
            total: get_order.total,
            type: get_order.type,
            method: get_order.method,
            driverlicense: get_order.driverlicense,
            driver: get_order.driver,
            daystart: get_order.daystart,
            dayend: get_order.dayend,
            wherestart: get_order.wherestart,
            whereend: get_order.whereend,
            product: get_order.product,
            idproduct: get_order.idproduct,
            iddriver: get_order.iddriver,
            emaildriver: get_order.emaildriver,
            note: get_order.note,
            ordernumber: list_order_number.ordernumber + 1,

        });
        const save_order = await newOverview.save();

        const today = new Date();
        const month = (today.getMonth()+1)+'-'+today.getFullYear();

        const order_list = await Overview.find({idproduct: get_order.idproduct})
        const all_order = order_list.map((order_month)=>{
                const complete = (order_month.createdAt)
                const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
                if(complete_month === month){
                    return order_month;
                }
            })
            const order_list_total = []
            for(let i=0; i<all_order.length ; i++){
                if(all_order[i] != null){
                    order_list_total.push(all_order[i])
                }
            }

            let total_product = 0;
            let count = 0;
            const product_order = order_list_total.map(product=>{
                total_product = total_product + product.total;
                count++;
            })
    
            const get_driver = await User.findById(get_order.iddriver);
            const sum_salary =  ((total_product*get_driver.percent_total)/100) + get_driver.salary + get_driver.reward
            const updateDoc = {
                total_month: total_product,
                count_order: count,
                salary_total: sum_salary,
                
            };

            console.log("updateDoc", updateDoc)
            const options = {returnDocument: "after"};
            const update_productdriver = await ProductDriver.findByIdAndUpdate(get_order.idproduct, updateDoc, options);
            const update_driver = await User.findByIdAndUpdate(get_order.iddriver, updateDoc, options);
   
                
      

        //Khách hàng
        
        const customer_list = await Overview.find({phonenumber: get_order.phonenumber});
    

         const all_order_customer = customer_list.map((customer_month)=>{
             const completeD = (customer_month.createdAt)
             const complete_customer = (completeD.getMonth()+1)+'-'+completeD.getFullYear();
             if(complete_customer === month){
                 return customer_month;
             }
         })

         const order_list_total_customer = []
            for(let i=0; i<all_order_customer.length ; i++){
                if(all_order_customer[i] != null){
                    order_list_total_customer.push(all_order_customer[i])
                }
            }

         
         let total_customer = 0;
         let count_order_customer =0
         const customer_order = order_list_total_customer.map(customer=>{
             total_customer = total_customer + customer.total;
             count_order_customer++
         })

        
         
         const updateCustomer = {
             total_month: total_customer,
             count_order: count_order_customer,
             discount: 0
         }
        
         const update_customer = await Customer.findOneAndUpdate({phonenumber: phonenumber_customer}, updateCustomer,  { new : true });

        const complete_order = await Order.findByIdAndDelete(get_order._id)
        return res.send(all_order);
    } catch (error) {
        return next(error);
    }
}


//Hoàn tất đơn hàng
const completeOrder = async(req, res, next) => {
    try {
        

        const get_order = await Order.findById(req.params.id);
        const list_order_number =await Overview.findOne({}, {}, {sort: {'createdAt': -1}})
        const phonenumber_customer = get_order.phonenumber
        const newOverview = new Overview({
            name: get_order.name,
            phonenumber: get_order.phonenumber,
            address: get_order.address,
            cic: get_order.cic,
            discount: get_order.discount,
            rentcost: get_order.rentcost,
            surcharge: get_order.surcharge,
            total: get_order.total,
            type: get_order.type,
            method: get_order.method,
            driverlicense: get_order.driverlicense,
            driver: get_order.driver,
            daystart: get_order.daystart,
            dayend: get_order.dayend,
            wherestart: get_order.wherestart,
            whereend: get_order.whereend,
            product: get_order.product,
            idproduct: get_order.idproduct,
            iddriver: get_order.iddriver,
            emaildriver: get_order.emaildriver,
            note: get_order.note,
            ordernumber: list_order_number.ordernumber + 1,
        });
        const save_order = await newOverview.save();

        const today = new Date();
        const month = (today.getMonth()+1)+'-'+today.getFullYear();
                
        const order_list = await Overview.find({idproduct: get_order.idproduct})
     
        const all_order = order_list.map((order_month)=>{
                const complete = (order_month.createdAt)
                const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
                if(complete_month === month){
                    return order_month;
                }
            })
            const order_list_total = []
            for(let i=0; i<all_order.length ; i++){
                if(all_order[i] != null){
                    order_list_total.push(all_order[i])
                }
            }
           

            let total_product = 0;
            const product_order = order_list_total.map(product=>{
                total_product = total_product + product.total;
            })

     
            // const get_driver = await User.findById(get_order.iddriver);
            // const sum_salary =  ((total_product*get_driver.percent_total)/100) + get_driver.salary + get_driver.reward
            const updateDoc = {
                total_month: total_product,
            };
            console.log("updateDoc", updateDoc)
            const options = {returnDocument: "after"};
            const update_productdriver = await Product.findByIdAndUpdate(get_order.idproduct, updateDoc, options);
         

        // Khách hàng
        
        const customer_list = await Overview.find({phonenumber: get_order.phonenumber});
       
       
         const all_order_customer = customer_list.map((customer_month)=>{
             const completeD = (customer_month.createdAt)
             const complete_customer = (completeD.getMonth()+1)+'-'+completeD.getFullYear();
             if(complete_customer === month){
                 return customer_month;
             }
         })

         
         const order_list_total_customer = []
            for(let i=0; i<all_order_customer.length ; i++){
                if(all_order_customer[i] != null){
                    order_list_total_customer.push(all_order_customer[i])
                }
            }

            console.log(order_list_total_customer)

         
         let total_customer = 0;
         let count_order_customer = 0;
         const customer_order = order_list_total_customer.map(customer=>{
             total_customer = total_customer + customer.total;
             count_order_customer++

         })

         console.log(total_customer)
         
         const updateCustomer = {
             total_month: total_customer,
             count_order: count_order_customer,
             discount: 0
         }

        
         
         const update_customer = await Customer.updateOne({phonenumber: phonenumber_customer}, updateCustomer);

        const complete_order = await Order.findByIdAndDelete(get_order._id)
        return res.send(update_customer);
    } catch (error) {
        return next(error);
    }
}


//Lấy danh sách đơn hàng theo số điện thoại
const getOrderByPhoneNumber = async(req, res, next) => {
    try {
        const list_order = await Order.find({ phonenumber: req.params.phonenumber });
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}

const getOrderByPhoneNumberStatusTrue = async(req, res, next) => {
    try {
        const list_order = await Order.find({ phonenumber: req.params.phonenumber, status: "Đã lên lịch" });
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}

const getOrderByPhoneNumberStatusFalse = async(req, res, next) => {
    try {
        const list_order = await Order.find({ phonenumber: req.params.phonenumber, status: "Chờ xử lí"  });
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}


const getOrderByIdDriver = async(req, res, next) => {
    try {
        const list_order_of_driver = await Order.find({iddriver: req.params.iddriver});
        return res.send(list_order_of_driver);
    } catch (e) {
        return next(e);
    }
}

// Xóa đơn hàng
const deleteOrder= async (req, res, next) => {
    try{
        const options = { returnDocument: "after" };
        const updatedoc = {
            reasonCancel: req.body.reasonCancel
        }
        const order_update = await Order.findByIdAndUpdate(req.params.id, updatedoc, options)

        const get_order = await Order.findById(req.params.id);
        const orderDelete = await new OrderCancel({
            name: get_order.name,
            phonenumber: get_order.phonenumber,
            address: get_order.address,
            cic: get_order.cic,
            discount: get_order.discount,
            rentcost: get_order.rentcost,
            surcharge: get_order.surcharge,
            total: get_order.total,
            type: get_order.type,
            method: get_order.method,
            driverlicense: get_order.driverlicense,
            driver: get_order.driver,
            daystart: get_order.daystart,
            dayend: get_order.dayend,
            wherestart: get_order.wherestart,
            wherend: get_order.whereend,
            product: get_order.product,
            idproduct: get_order.idproduct,
            iddriver: get_order.iddriver,
            emaildriver: get_order.emaildriver,
            note: get_order.note,
            reasonCancel: get_order.reasonCancel,
        });
        const save_ordercancel = await orderDelete.save();
        
        const getId = req.params.id;
        const customer = await Customer.findOne({phonenumber: get_order.phonenumber})

            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "nhot2telecom@gmail.com",
                    pass: "zyed hwvf mpus vtyf",
                }
            });
            
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: 'nhot2telecom@gmail.com', // sender address
                to: "quocvinhh1311@gmail.com", // list of receivers
                subject: `Xin chào ${orderDelete.name}`, // Subject line
                text: `Quá trình đặt xe của bạn Không thành công!!! Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!`, // plaintext body
                html: `<b>Lên lịch không thành công thành công!</b><br /> <p>Đơn hàng của bạn không thể lên lịch vì lí do ${orderDelete.reasonCancel}</p><br/><p>Xin lỗi vì sự bất tiện này!</p>`
            }
            
            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console(response)
                }
            });
        const response = await Order.findByIdAndDelete(getId);
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa đơn hàng!"));  
    }
}


// Xóa đơn hàng
const deleteOrderDriver = async (req, res, next) => {
    try{
        const options = { returnDocument: "after" };
        const updatedoc = {
            reasonCancel: req.body.reasonCancel
        }
        const order_update = await Order.findByIdAndUpdate(req.params.id, updatedoc, options)

        const get_order = await Order.findById(req.params.id);
        const orderDelete = await new OrderCancel({
            name: get_order.name,
            phonenumber: get_order.phonenumber,
            address: get_order.address,
            cic: get_order.cic,
            discount: get_order.discount,
            rentcost: get_order.rentcost,
            surcharge: get_order.surcharge,
            total: get_order.total,
            type: get_order.type,
            method: get_order.method,
            driverlicense: get_order.driverlicense,
            driver: get_order.driver,
            daystart: get_order.daystart,
            dayend: get_order.dayend,
            wherestart: get_order.wherestart,
            wherend: get_order.whereend,
            product: get_order.product,
            idproduct: get_order.idproduct,
            iddriver: get_order.iddriver,
            emaildriver: get_order.emaildriver,
            note: get_order.note,
            reasonCancel: get_order.reasonCancel
        });


        const save_ordercancel = await orderDelete.save();

        const getId = req.params.id;
        const response = await Order.findByIdAndDelete(getId);
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa đơn hàng!"));  //Không cần return cũng được
    }
}


// Xóa đơn hàng
const sendEmail = async (req, res, next) => {
    try{

        const {email} = req.body;

        console.log(email)

        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "nhot2telecom@gmail.com",
                pass: "zyed hwvf mpus vtyf",
            }
        });
        
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'nhot2telecom@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world ✔", // plaintext body
            html: "<b>Hello world ✔</b>" // html body
        }
        
        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console(response)
            }
        });
       
    }catch(error){
        return next(error);  
    }
}

const findProductFit = async(req, res, next) => {
    try {
        let start = req.query.daystart;
        let end = req.query.dayend;
        const list_product = await Product.find();
        const list_order1 = await Order.find({method: "2"});
        const list_order2 = await Order.find({method: "3"});

        const datstart = new Date(start)
        const datend = new Date(end)
        const month_start = datstart.getMonth() + 1
        const month_end = datend.getMonth() + 1

        const year_start = datstart.getFullYear()
        const year_end = datend.getFullYear()

        console.log(year_start, year_end)
        
       

        if(month_start === month_end){

            const d1 = datstart.getTime()
            const d2 = datend.getTime()

            let day_less = datstart.getDate()

            const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
            const arrayday = []
            var  i = 0;
            for(i; i < day ; i++){
                    arrayday.push(day_less+"-"+month_year)
                    day_less++
                }
        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await Product.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }

        
        if(year_start === year_end && month_start != month_end){

            const d1 = datstart.getDate()
            const d2 = datend.getDate()

            const month_start = datstart.getMonth() + 1
            const month_end = datend.getMonth() + 1

            const year = datstart.getFullYear()
            

            // const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const arrayday = []
            var  i = 0;
            for(let i = d1; i <= 31  ; i++){
                    arrayday.push(i+"-"+month_start+"-"+year)
            }

            for(let i = 1; i <= d2  ; i++){
                arrayday.push(i+"-"+month_end+"-"+year)
            }

            console.log(arrayday)

            

        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await Product.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }

        if(year_start != year_end && month_start != month_end){

            const d1 = datstart.getDate()
            const d2 = datend.getDate()

            const month_start = datstart.getMonth() + 1
            const month_end = datend.getMonth() + 1

            const year_start = datstart.getFullYear()
            const year_end = datend.getFullYear()
            

            // const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const arrayday = []
            var  i = 0;
            for(let i = d1; i <= 31  ; i++){
                    arrayday.push(i+"-"+month_start+"-"+year_start)
            }

            for(let i = 1; i <= d2  ; i++){
                arrayday.push(i+"-"+month_end+"-"+year_end)
            }

            console.log(arrayday)

            

        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await Product.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }


       
    } catch (e) {
        return next(e);
    }
}


const findDriverProductFit = async(req, res, next) => {
    try {
        let start = req.query.daystart;
        let end = req.query.dayend;
        const list_product = await ProductDriver.find();
        const list_order1 = await Order.find({method: "1"});
        const list_order2 = await Order.find({method: "4"});

        const datstart = new Date(start)
        const datend = new Date(end)
        const month_start = datstart.getMonth() + 1
        const month_end = datend.getMonth() + 1

        const year_start = datstart.getFullYear()
        const year_end = datend.getFullYear()

        console.log(year_start, year_end)
        
       

        if(month_start === month_end){

            const d1 = datstart.getTime()
            const d2 = datend.getTime()

            let day_less = datstart.getDate()

            const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
            const arrayday = []
            var  i = 0;
            for(i; i < day ; i++){
                    arrayday.push(day_less+"-"+month_year)
                    day_less++
                }
        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await ProductDriver.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }

        
        if(year_start === year_end && month_start != month_end){

            const d1 = datstart.getDate()
            const d2 = datend.getDate()

            const month_start = datstart.getMonth() + 1
            const month_end = datend.getMonth() + 1

            const year = datstart.getFullYear()
            

            // const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const arrayday = []
            var  i = 0;
            for(let i = d1; i <= 31  ; i++){
                    arrayday.push(i+"-"+month_start+"-"+year)
            }

            for(let i = 1; i <= d2  ; i++){
                arrayday.push(i+"-"+month_end+"-"+year)
            }

            console.log(arrayday)

            

        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await ProductDriver.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }

        if(year_start != year_end && month_start != month_end){

            const d1 = datstart.getDate()
            const d2 = datend.getDate()

            const month_start = datstart.getMonth() + 1
            const month_end = datend.getMonth() + 1

            const year_start = datstart.getFullYear()
            const year_end = datend.getFullYear()
            

            // const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
            const arrayday = []
            var  i = 0;
            for(let i = d1; i <= 31  ; i++){
                    arrayday.push(i+"-"+month_start+"-"+year_start)
            }

            for(let i = 1; i <= d2  ; i++){
                arrayday.push(i+"-"+month_end+"-"+year_end)
            }

            console.log(arrayday)

            

        
            const list_id = []
            for(let i=0; i< list_product.length; i++){
                list_id.push(list_product[i].id)
            }
    
            const list_order = list_order1.concat(list_order2)
    
             
            const arr_id_product = []
            for(let i=0 ; i< list_order.length; i++){
                const start = list_order[i].daystart
                const end = list_order[i].dayend
                const d1 = start.getTime()
                const d2 = end.getTime()
    
                let day_less = start.getDate()
    
                const month_year = (start.getMonth()+1)+'-'+start.getFullYear()
                const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
                const array_day = []
              
                for(let i = 0; i < day ; i++){
                        array_day.push(day_less+"-"+month_year)
                        day_less++
                    }
    
                    const newObject = {
                        idproduct: list_order[i].idproduct,
                        array_order: array_day
                    }
                arr_id_product.push(newObject)
            }
    
            const arr_day_list = arr_id_product.map(item=>{
                const list = []
                for(let k = 0; k < (item.array_order).length; k++){
                    for(let i=0; i< arrayday.length ; i++){
                        if((item.array_order)[k] === arrayday[i]){
                            list.push((item.idproduct))
                        }
                    }
                }  
                return list;
            })
            
            const a = []
    
            for(let i=0; i< arr_day_list.length ; i++){
                for(let j = 0 ; j < arr_day_list[i].length; j++){
                    a.push(arr_day_list[i][j])
                }
            }
            
            const list_pro = [...list_id, ...a]
          
    
            function findUniqueElements(arr) {
                return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
              }
    
            const datalist = findUniqueElements(list_pro);
    
            const list_product_check = []
            for(let i = 0; i < datalist.length ; i++){
                const product = await ProductDriver.findById(datalist[i]);
                list_product_check.push(product)
            }
       
            return res.send(list_product_check);
        }


       
    } catch (e) {
        return next(e);
    }
}




module.exports ={createOrder,createOrderOnline, findProductFit, findDriverProductFit,getOrderByPhoneNumberStatusTrue,getOrderByPhoneNumberStatusFalse, createOrderNewCustomer,sendEmail, getAllOrder, getOrderById,getOrderByIdProduct,getOrderByIdDriver,completeOrderDriver , getOrderByEmail, getOrderByMethod, updateOrder, completeOrder, getOrderByPhoneNumber, deleteOrder,deleteOrderDriver,  getOrderOnline }

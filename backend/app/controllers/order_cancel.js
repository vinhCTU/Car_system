
const OrderCancel = require("../models/order_cancel");
const ApiError = require("../api-error");

//Tạo đơn hàng (đã chạy đúng)
const createOrder = async(req, res, next) => {
    const OrderInfo = new Order(req.body);
    
    try {
        const newOrder = await OrderInfo.save();
        

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
        const order_list = await OrderCancel.find().sort({"createdAt": -1});
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
        const Order_detail = await Order.find({method: req.params.method});
        return res.send(Order_detail);
    } catch (error) {
        return next(error);
    }
}






//Lấy danh sách đơn hàng theo số điện thoại
const getOrderCancelByPhoneNumber = async(req, res, next) => {
    try {
        const list_order = await OrderCancel.find({ phonenumber: req.params.phonenumber, isDelete: false });
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}


const deleteOrderCancelCustomer = async(req, res, next) => {
    try {
        const options = { returnDocument: "after" };
        console.log(req.params.id)
        const list_order_of_driver = await OrderCancel.findByIdAndUpdate(req.params.id, {isDelete : true}, options );
        return res.send(list_order_of_driver);
    } catch (e) {
        return next(e);
    }
}


module.exports ={getOrderCancelByPhoneNumber, getAllOrder, deleteOrderCancelCustomer}

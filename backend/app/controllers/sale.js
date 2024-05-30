const Sale = require("../models/sale");
const ApiError = require("../api-error");

 const createSale = async (req, res, next) => {
    const saleInfo = new Sale(req.body); //biến chưa thông tin sản phẩm từ req.body
    try{
        const newSale = await saleInfo.save();
        return res.send(newSale);
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi tạo giảm giá!"));
    }
}

const getSale = async (req, res, next)=>{
    try{
        const Salelist = await Sale.find()
        return res.send(Salelist); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin giảm giá")); 
    }
}

const updateSale = async (req, res, next) => {
    try{
        const updateDoc = req.body;
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update = await Sale.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin giảm giá!")); 
    }
}

const getDetailSale = async (req, res, next) => {
    try{
        const id_of_sale = req.params.id;
        const detail_of_sale = await Sale.findById(id_of_sale);
        return res.send(detail_of_sale); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin giảm giá"));  
    }
}

const deleteSale = async (req, res, next) => {
    try{
        const getId = req.params.id
        const response = await Sale.findByIdAndDelete(getId);
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa thông tin giảm giá!"));  //Không cần return cũng được
    }
}

const getSaleByType = async (req, res, next) => {
    try{
        if(req.params.type != ""){
            // const list_of_price = await Pricelist.find();
            // return res.send(list_of_price);   
            const list_of_sale = await Sale.find({type: req.params.type});
            return res.send(list_of_sale);
        }else{
            const list_of_sale = await Pricelist.find();
            return res.send(list_of_sale);   
        }
        // const pricelists= await Pricelist.find({type: req.params.type});
        // return res.send(pricelists); //Không cần return cũng được
    }catch(err){
        return next(err);  //Không cần return cũng được
    }
}

module.exports = {
    createSale,
    getSale,
    updateSale,
    getDetailSale,
    deleteSale,
    getSaleByType,
}
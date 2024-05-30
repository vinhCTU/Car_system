const ApiError = require("../api-error");
const ProductCategory = require("../models/product_category");

//Thêm loại sản phẩm mới (đã chạy đúng)
const createProductCategory = async (req, res, next) => {
    const category_info = new ProductCategory(req.body);
    try{
        const new_category = await category_info.save();
        return res.send(new_category);
    }catch(err){
        return next(err)
    }
}

//Chỉnh sửa thông tin loại sản phẩm (đã chạy đúng)
const updateProductCategory = async (req, res, next) => {
    try{
        //Tìm trong tất cả các loại sản phẩm có tên trùng không
        const product_categories = await ProductCategory.find();
        for(let i = 0; i < product_categories.length; i++){
            if(req.body.name == product_categories[i].name){
                return next(new ApiError(400, "Tên loại sản phẩm này đã tồn tại, vui lòng chọn tên khác"));
            }
        }
        const options = {returnDocument: "after"};
        const updateDoc = {
            category_name: req.body.name,
        };
        const productCategoryUpdate = await ProductCategory.findOneAndUpdate({number_type: req.params.number_type}, updateDoc, options);
        return res.send(productCategoryUpdate);
    }catch(error){
        return next(new ApiError(500, "Có lỗi xảy ra khi chỉnh sửa thông tin loại sản phẩm"));
    }
}

//Lấy thông tin tất cả loại sản phẩm 
const getAllProductCategory = async (req, res, next) => {
    try{
        const product_category_list = await ProductCategory.find().sort({'type': 1});
        return res.send(product_category_list);
    }catch(error){
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin loại sản phẩm"));
    }
}

//Lấy thông tin chi tiết 1 loại sản phẩm 
const getDetailProductCategory = async (req, res, next) => {
    try{
        const detailProductCategory = await ProductCategory.findOne({number_type: req.params.number_type});
        return res.send(detailProductCategory);
    }catch(error){
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin loại sản phẩm"));
    }
}

const deleteProductCategory = async (req, res, next) => {
    try{
        const getIdC= req.params.id
        const response = await ProductCategory.findByIdAndDelete(getIdC);
        return res.send(response)
    }catch(err){
        // return next(new ApiError(500,"Có lỗi xảy ra khi xóa sản phẩm!")); 
        return next(err)
    }
}

module.exports ={createProductCategory,updateProductCategory, getAllProductCategory, getDetailProductCategory, deleteProductCategory}
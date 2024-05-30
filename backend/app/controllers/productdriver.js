const ProductDriver = require("../models/productdriver");
const User = require("../models/auth");
const ApiError = require("../api-error");


 const createProduct = async (req, res, next) => {
    const productInfo = new ProductDriver(req.body);
    try{
        const newProduct = await productInfo.save();
        const info_driver = await User.findByIdAndUpdate(req.body.idDriver, {status: true}, {new: true})
        return res.send(info_driver);
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}


const getProduct = async (req, res, next)=>{
    try{
        const keyword = req.query.key
        if(keyword === ""){
            const products = await ProductDriver.find().sort({"type": 1})
            return res.send(products);
        }
        if( keyword != ""){
            const products = await ProductDriver.find({
                "$or":[
                    {name: {$regex:req.query.key,  $options: 'i'}},
                    {carcompany: {$regex:req.query.key,  $options: 'i'}},
                    {color: {$regex:req.query.key,  $options: 'i'}},
                    {driver: {$regex:req.query.key,  $options: 'i'}},
                    {license_plate: {$regex:req.query.keyword,  $options: 'i'}},
                ]
            }).sort({"total_month": -1})
            return res.send(products);
        }
         
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

const getProductDriverTop3 = async (req, res, next)=>{
    try{
        const products = await ProductDriver.find().sort({"total_month": -1}).limit(3)
        return res.send(products); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}
//Hiển thị chi tiết sản phẩm (đã chạy đúng)
const findDetailProduct = async (req, res, next) => {
    try{
        const id_of_product = req.params.id;
        const detail_of_product = await ProductDriver.findById(id_of_product);
        return res.send(detail_of_product); //Không cần return cũng được
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

//Hiển thị chi tiết sản phẩm (đã chạy đúng)
const findDetailProductByIdDriver = async (req, res, next) => {
    try{
        const detail_of_product = await ProductDriver.findOne({idDriver: req.params.idDriver});
        return res.send(detail_of_product); //Không cần return cũng được
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

//Tìm sản phẩm theo tên qua keyword (đã chạy đúng)
const searchProductByKeyword = async (req, res, next) => { 
    try{
        const list_product = await ProductDriver.find({
            "$or":[
                {name: {$regex:req.query.keyword,  $options: 'i'}},
                {carcompany: {$regex:req.query.keyword,  $options: 'i'}},
                {color: {$regex:req.query.keyword,  $options: 'i'}},
                {driver: {$regex:req.query.keyword,  $options: 'i'}},
            ]
        });
        return res.send(list_product);
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

const findProductDriverByType = async (req, res, next) => {
    try{
        if(req.params.type != "all"){
            const list_of_product = await ProductDriver.find({type: req.params.type});
            return res.send(list_of_product);   //Không cần return cũng được
        }else{
            const list_of_product = await ProductDriver.find();
            return res.send(list_of_product);   //Không cần return cũng được
        }

    }catch(err){
        // return res.status(501).send(err);
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}

//Cập nhật thông tin 1 sản phẩm (đã chạy đúng)
const updateProduct = async (req, res, next) => {
    try{
       
        // console.log("updateDoc", updateDoc)
        const driver = await User.findById(req.body.idDriver)
        const updateDoc = {
            driver: driver.name
        }
        const options = {returnDocument: "after"};
        const updatedriver = {
            idProduct: req.params.id,
            status: true, 
        }
        const info_driver = await User.findByIdAndUpdate(req.body.idDriver, updatedriver , options)
        const update = await ProductDriver.findByIdAndUpdate(req.params.id, req.body, options);
        const  update_product = await ProductDriver.findByIdAndUpdate(req.params.id, updateDoc, options);
        
        
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin sản phẩm!"));  //Không cần return cũng được
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const getId = req.params.id
        const response = await ProductDriver.findByIdAndDelete(getId);
        const info_driver = await User.findByIdAndUpdate(req.body.idDriver, {status: false}, {new: true})
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa sản phẩm!"));  //Không cần return cũng được
    }
}


const createProductDriverlistFile = async (req, res, next) => {
    try{
        const product_list = req.body
      
        const product = await ProductDriver.find();
        let arrData = []
        console.log(product_list)

        for(let i=0; i < product.length; i++){
            for(let j =0 ; j < product_list.length; j++){
                if((product[i].license_plate === product_list[j][9])){
                    arrData.push(product_list[j])
                }
            }
            
        }
        function findUniqueElements(arr) {
            return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
          }
          
          const arr = [...product_list,...arrData] 

          const datalist = findUniqueElements(arr);
            function changeDate(day){
                const dateTestDay = new Date((day - 25569) * 86400 * 1000);

                let monthDateTestDay;
                if(dateTestDay.getMonth()+1<10){
                    monthDateTestDay = `0${dateTestDay.getMonth()+1}`;
                }else{
                    monthDateTestDay = dateTestDay.getMonth()+1;
                }
                let dayDateTestDay;

                if(dateTestDay.getDate()<10){
                    dayDateTestDay=`0${dateTestDay.getDate()}`;
                }else{
                    dayDateTestDay = dateTestDay.getDate();
                }

                return `${dateTestDay.getFullYear()}-${monthDateTestDay}-${dayDateTestDay}`

                
            }

             for(let i=0 ; i < datalist.length ; i++){
                            const save_price = new ProductDriver({
                                    name: datalist[i+1][0], 
                                    imageURL: datalist[i+1][1],
                                    type: datalist[i+1][2],
                                    color: datalist[i+1][3],
                                    carcompany: datalist[i+1][4], 
                                    vehical_id: datalist[i+1][5],
                                    license_plate: datalist[i+1][6],
                                    date_range:  changeDate(datalist[i+1][7]),
                                    expiration_date: changeDate(datalist[i+1][8]),
                                    description: datalist[i+1][9],
                            })
                            const datasave = await save_price.save();
                            console.log(datasave)
            }
            return res.send(arrData); 
          }
                          
                           
            
          
    

           
    catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi tạo bảng giá!"));
    }
}



module.exports = {createProduct, updateProduct,findProductDriverByType,createProductDriverlistFile , findDetailProductByIdDriver, findDetailProduct, searchProductByKeyword,getProductDriverTop3, deleteProduct, getProduct}
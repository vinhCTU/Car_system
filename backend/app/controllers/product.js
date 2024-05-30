const Product = require("../models/product");
const Order = require("../models/order");
const ApiError = require("../api-error");

//Chèn 1 sản phẩm vào DB (đã chạy đúng)
 const createProduct = async (req, res, next) => {
    const productInfo = new Product(req.body); //biến chưa thông tin sản phẩm từ req.body
    try{
        const newProduct = await productInfo.save();
        return res.send(newProduct);
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}

//Tìm kiếm sản phẩm theo loại hoặc tất cả sản phẩm (đã chạy đúng)
const findProductByType = async (req, res, next) => {
    try{
        
        if(req.params.type != "all"){
            
            const list_of_product = await Product.find({type: req.params.type});
            return res.send(list_of_product);
        }else{
            const list_of_product = await Product.find().sort({"type": 1});
            return res.send(list_of_product);   
        }
    }catch(err){
        // return res.status(501).send(err);
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}


const getProduct = async (req, res, next)=>{
    try{
        const key = req.query.key
        if(key === ""){
            const products = await Product.find().sort({"type": 1})
            return res.send(products);
        }

        if(key != ""){
            const products = await Product.find({
                "$or":[
                    {name: {$regex:req.query.key,  $options: 'i'}},
                    {carcompany: {$regex:req.query.key,  $options: 'i'}},
                    {color: {$regex:req.query.key,  $options: 'i'}},
                    {type_car: {$regex:req.query.key,  $options: 'i'}},
                  
                ]
            }).sort({"type": 1})
            return res.send(products);
        }
         
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  
    }
}


const getProductStatusFalse = async (req, res, next)=>{
    try{
        const day_check = new Date();
        const day = day_check.getDate()+'-'+(day_check.getMonth()+1)+'-'+day_check.getFullYear();


        console.log(day)
        const order_list = await Order.find();
        const all_order = order_list.map((order)=>{
            const order_daystart  = (order.daystart)
            const order_dayend  = (order.dayend)
            const daystart_coincide = order_daystart.getDate()+'-'+(order_daystart.getMonth()+1)+'-'+order_daystart.getFullYear();
            if(daystart_coincide === day){
                return order;
            }
        })

        const product_status_false = all_order.map(item =>{
            if(item !=null ){
                return  id = item.idproduct
            }else{
                return "1"
            }
        })


        
        const products = await Product.find({})
        
        return res.send(product_status_false); 
    }catch(err){
        return next(err); 
    }
}

const getProductTop3Month = async (req, res, next)=>{
    try{
        const products = await Product.find().sort({"total_month": -1}).limit(3)
        return res.send(products); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  
    }
}
//Hiển thị chi tiết sản phẩm (đã chạy đúng)
const findDetailProduct = async (req, res, next) => {
    try{
        const id_of_product = req.params.id;
        const detail_of_product = await Product.findById(id_of_product);
        return res.send(detail_of_product); //Không cần return cũng được
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

//Tìm sản phẩm theo tên qua keyword (đã chạy đúng)
const searchProductByKeyword = async (req, res, next) => { 
    try{
       
        const list_product = await Product.find({
            "$or":[
                {name: {$regex:req.query.keyword,  $options: 'i'}},
                {carcompany: {$regex:req.query.keyword,  $options: 'i'}},
                {color: {$regex:req.query.keyword,  $options: 'i'}},
                {type_car: {$regex:req.query.keyword,  $options: 'i'}},
                {license_plate: {$regex:req.query.keyword,  $options: 'i'}},
            ]
        });
        return res.send(list_product);
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin sản phẩm"));  //Không cần return cũng được
    }
}

//Cập nhật thông tin 1 sản phẩm (đã chạy đúng)
const updateProduct = async (req, res, next) => {
    try{
        const updateDoc = req.body;
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update = await Product.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin sản phẩm!"));  //Không cần return cũng được
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const getId = req.params.id
        const response = await Product.findByIdAndDelete(getId);
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa sản phẩm!"));  //Không cần return cũng được
    }
}


const createProductlistFile = async (req, res, next) => {
    try{
        const product_list = req.body
      
        const product = await Product.find();
        let arrData = []

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
                            const save_price = new Product({
                                    name: datalist[i+1][0], 
                                    imageURL: datalist[i+1][1],
                                    price: datalist[i+1][2],
                                    type: datalist[i+1][3],
                                    color: datalist[i+1][4],
                                    type_car: datalist[i+1][5],
                                    carcompany: datalist[i+1][6], 
                                    vehical_id: datalist[i+1][7],
                                    license_plate: datalist[i+1][8],
                                    date_range: changeDate(datalist[i+1][9]),
                                    expiration_date: changeDate(datalist[i+1][10]),
                                    description: datalist[i+1][11],
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


module.exports = {createProduct, updateProduct, findDetailProduct,createProductlistFile , searchProductByKeyword, deleteProduct,getProductStatusFalse, getProduct,getProductTop3Month, findProductByType}
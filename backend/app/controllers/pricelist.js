const Pricelist = require("../models/pricelist");
const ApiError = require("../api-error");

 const createPricelist = async (req, res, next) => {
    const pricelistInfo = new Pricelist(req.body); //biến chưa thông tin sản phẩm từ req.body
    try{
        const newList = await pricelistInfo.save();
        return res.send(newList);
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi taoj bảng giá!"));
    }
}

const createPricelistFile = async (req, res, next) => {
    try{
        const price_list = req.body
      
        const price = await Pricelist.find();
        let arrData = []

        for(let i=0; i < price.length; i++){
            for(let j =0 ; j < price_list.length; j++){
                if((price[i].type === price_list[j][0]) && (price[i].whereend) === price_list[j][1] ){
                    arrData.push(price_list[j])
                }
            }
            
        }
        function findUniqueElements(arr) {
            return arr.filter((element, index, array) => array.indexOf(element) === array.lastIndexOf(element));
          }
          
          const arr = [...price_list,...arrData] 
          const datalist = findUniqueElements(arr);
            for(let i=0 ; i< datalist.length; i++){
                            const save_price = new Pricelist({
                                    type: datalist[i+1][0],
                                    whereend:datalist[i+1][1],
                                    price: datalist[i+1][2]
                            })
                            const datasave = await save_price.save();
                            console.log(datasave)
            }
            return res.send(arrData); 
    }catch(err){
        return next(new ApiError(500,"Có lỗi xảy ra khi tạo bảng giá!"));
    }
}

const getPricelist = async (req, res, next)=>{
    try{
        const pricelist = await Pricelist.find().sort({'whereend': 1});
        return res.send(pricelist); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin bảng giá"));  //Không cần return cũng được
    }
}


const updatePricelist= async (req, res, next) => {
    try{
        const updateDoc = req.body;
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update = await Pricelist.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi cập nhật thông tin bangr giá!"));  //Không cần return cũng được
    }
}

const getDetailPricelist = async (req, res, next) => {
    try{
        const id_of_pricelist = req.params.id;
        const detail_of_pricelist = await Pricelist.findById(id_of_pricelist);
        return res.send(detail_of_pricelist); 
    }catch{
        return next(new ApiError(500,"Có lỗi xảy ra khi lấy thông tin bảng giá"));  
    }
}



const deletePricelist = async (req, res, next) => {
    try{
        const getId = req.params.id
        const response = await Pricelist.findByIdAndDelete(getId);
        return res.send(response)
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi xóa bảng giá!"));  //Không cần return cũng được
    }
}

const getPricelistByType = async (req, res, next) => {
    try{
        if(req.params.type != "all"){
            // const list_of_price = await Pricelist.find();
            // return res.send(list_of_price);   
            const list_of_price = await Pricelist.find({type: req.params.type}).sort({'price': 1});
            return res.send(list_of_price);
        }else{
            const list_of_price = await Pricelist.find().sort({'type': 1});
            return res.send(list_of_price);   
        }
        // const pricelists= await Pricelist.find({type: req.params.type});
        // return res.send(pricelists); //Không cần return cũng được
    }catch(err){
        return next(err);  //Không cần return cũng được
    }
}


const FindPricelistByType = async (req, res, next) => {
    try{
        const end = req.query.end
        if(req.params.type != "all"){
            if(end === ""){
                const list_of_price = await Pricelist.find({type: req.params.type}).sort({'price': 1});
                return res.send(list_of_price);
            }
            else{
               const list_of_price = await Pricelist.find({
                    type: req.params.type,
                    "$or":[
                        {whereend: {$regex:end,  $options: 'i'}},  
                    ]

                }).sort({'price': 1});
                return res.send(list_of_price);
            }
        }else{ 
            if(end === ""){
                const list_of_price = await Pricelist.find().sort({'price': 1});
                return res.send(list_of_price);
            }
            else{
               const list_of_price = await Pricelist.find({
                    "$or":[
                        {whereend: {$regex:end,  $options: 'i'}},  
                    ]

                }).sort({'price': 1});
                return res.send(list_of_price);
            }  
        }
            
  
        // const pricelists= await Pricelist.find({type: req.params.type});
        // return res.send(pricelists); //Không cần return cũng được
    }catch(err){
        return next(err);  //Không cần return cũng được
    }
}

module.exports = {createPricelist,createPricelistFile,FindPricelistByType, updatePricelist,getDetailPricelist,  deletePricelist, getPricelist, getPricelistByType}
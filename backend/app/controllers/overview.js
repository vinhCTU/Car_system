const Overview = require("../models/overview");
const Product = require("../models/product");
const ProductDriver = require("../models/productdriver");
const User = require("../models/auth");
const Customer = require("../models/customer");
const ApiError = require("../api-error");

//Lấy tất cả đơn hàng (đã chạy đúng)
const getOrderToDay = async(req, res, next) => {
    try {
    
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

        const order_list = await Overview.find();
        const all_order = order_list.map((order)=>{
            const complete = (order.createdAt)
            const complete_today = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_today === date){
                return order;
            }
        })

        return res.send(all_order);

    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

const getOrderToDayByMethod = async(req, res, next) => {
    try {
    
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        if(req.params.method != "all"){
            const order_list = await Overview.find({method: req.params.method});
            const all_order = order_list.map((order)=>{
                const complete = (order.createdAt)
                const complete_today = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                if(complete_today === date){
                    return order;
                }
            })
            return res.send(all_order);
        }else{
            const order_list = await Overview.find();
            const all_order = order_list.map((order)=>{
            const complete = (order.createdAt)
            const complete_today = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_today === date){
                return order;
            }
        })

        return res.send(all_order);
        }
  

    } catch (error) {
        return next(error);
    }
}

const getOrderByMonth = async(req, res, next) => {
    try {
        
        const today = new Date();
        const month = (today.getMonth()+1)+'-'+today.getFullYear();
        
        const order_list = await Overview.find();
        const all_order = order_list.map((order_month)=>{
            const complete = (order_month.createdAt)
            const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
          
            if(complete_month === month){
                return order_month;
            }
        })

        return res.send(all_order);

    } catch (error) {
        return next(error);
    }
}


const getOrderByMonthSelect = async(req, res, next) => {
    try {
        
        const month = req.params.month
        // const month = (month_select.getMonth()+1)+'-'+month_select.getFullYear();
        
        const order_list = await Overview.find();
        const all_order = order_list.map((order_month)=>{
            const complete = (order_month.createdAt)
            const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_month === month){
                return order_month;
            }
        })

        return res.send(all_order);

    } catch (error) {
        return next(error);
    }
}

const getOrderByYear = async(req, res, next) => {
    try {
        const month = req.params.month
        const today = new Date()
        const year = today.getFullYear();

        const string_day = month+'-'+year;

        console.log(string_day)
        const order_list = await Overview.find();
        const all_order = order_list.map((order_month)=>{
            const complete = (order_month.createdAt)
            const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
            // const complete_month = (complete.getMonth()+1);
          
            if(complete_month === string_day){
                return order_month;
            }
        })
        
        const list_order_month = []
        for(let i=0; i < all_order.length; i++){
            if(all_order[i] != "underfined"){
                list_order_month.push(all_order[i])
            }
        }
        console.log(list_order_month)
        return res.send(list_order_month);

    } catch (error) {
        return next(error);
    }
}



const getOrderByDaySelect = async(req, res, next) => {
    try {
        
        const day = req.params.day
        // const month = (month_select.getMonth()+1)+'-'+month_select.getFullYear();
        
        const order_list = await Overview.find();
        const all_order = order_list.map((order_day)=>{
            const complete = (order_day.createdAt)
            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_day === day){
                return order_day;
            }
        })

        return res.send(all_order);

    } catch (error) {
        return next(error);
    }
}

const getOrderMostProduct = async(req, res, next) => {
    try {
        
        const today = new Date();
        const month = (today.getMonth()+1)+'-'+today.getFullYear();
                
        const order_list = await Overview.find({idproduct: req.params.idproduct});
        const all_order = order_list.map((order_month)=>{
            const complete = (order_month.createdAt)
            const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_month === month){
                return order_month;
            }
        })
        
        let total_product = 0;
        const product_order = all_order.map(product=>{
            total_product = total_product + product.total;
        })
        
        const updateDoc = {
            total_month: total_product
        };
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update_product = await Product.findByIdAndUpdate(req.params.idproduct, updateDoc, options);
        return res.send(update_product);

    } catch (error) {
        return next(error);
    }
}

const getOrderMostProductDriver = async(req, res, next) => {
    try {
        
        const today = new Date();
        const month = (today.getMonth()+1)+'-'+today.getFullYear();
                
        const order_list = await Overview.find({idproduct: req.params.idproduct});
        const all_order = order_list.map((order_month)=>{
            const complete = (order_month.createdAt)
            const complete_month = (complete.getMonth()+1)+'-'+complete.getFullYear();
            if(complete_month === month){
                return order_month;
            }
        })
        
        let total_product = 0;
        const product_order = all_order.map(product=>{
            total_product = total_product + product.total;
        })
        
        const updateDoc = {
            total_month: total_product
        };
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update_productdriver = await ProductDriver.findByIdAndUpdate(req.params.idproduct, updateDoc, options);
        return res.send(update_productdriver);

    } catch (error) {
        return next(error);
    }
}


const getOverviewByPhoneNumber = async(req, res, next) => {
    try {
        const list_order = await Overview.find({ phonenumber: req.params.phonenumber,state_comment: "false"  });
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}

const getOrderComlplete = async(req, res, next) => {
    try {
        const list_order = await Overview.find().sort({"createdAt": -1});
        return res.send(list_order);
    } catch (e) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy đơn hàng"));
    }
}



const getOrderMoreDaySelect = async(req, res, next) => {
    try {
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;
       


        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()
        
        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }

        if(value === ""){
            if(type === ""){
                const order_list1 = await Overview.find({method: "2"});
                const order_list2 = await Overview.find({method: "3"});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }

            if(type != ""){
                const order_list1 = await Overview.find({type: type, method: "2"})
                const order_list2 = await Overview.find({type: type, method: "3"})
                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
           
        }

        if(value != ""){
            if(type === ""){
                const order_list1 = await Overview.find({
                    method: "2",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                const order_list2 = await Overview.find({
                    method: "3",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });

                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
            
            if(type != ""){
                const order_list1 = await Overview.find({
                    type: type,
                    method: "2",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                const order_list2 = await Overview.find({
                    type: type,
                    method: "3",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
        }
        
 
       

    } catch (error) {
        return next(error);
    }
}


const getOrderDriverMoreDaySelect = async(req, res, next) => {
    try {
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;
       


        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()
        
        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }

        if(value === ""){
            if(type === ""){
                const order_list1 = await Overview.find({method: "1"});
                const order_list2 = await Overview.find({method: "4"});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }

            if(type != ""){
                const order_list1 = await Overview.find({type: type, method: "1"})
                const order_list2 = await Overview.find({type: type, method: "4"})
                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
           
        }

        if(value != ""){
            if(type === ""){
                const order_list1 = await Overview.find({
                    method: "1",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                const order_list2 = await Overview.find({
                    method: "4",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });

                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
            
            if(type != ""){
                const order_list1 = await Overview.find({
                    type: type,
                    method: "1",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                const order_list2 = await Overview.find({
                    type: type,
                    method: "4",
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                        {whereend: {$regex: value,  $options: 'i'}},
                    ]
                });
                let order_list = [...order_list1, ...order_list2];
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
        
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
        
                return res.send(or);
            }
        }
        
 
       

    } catch (error) {
        return next(error);
    }
}


const getDriverMoreDaySelect = async(req, res, next) => {
    try {
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;


        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }

        
        if(value === ""){
            if(type === ""){
                let order_list1 = await Overview.find({
                    method: "1"
                }).sort({"name": 1});
                let order_list2 = await Overview.find({
                    method: "4",
                }).sort({"name": 1});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            if(type != ""){
                let order_list1 = await Overview.find({
                    type: type,
                    method: "1"
                }).sort({"name": 1});
                let order_list2 = await Overview.find({
                    type: type,
                    method: "4",
                }).sort({"name": 1});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            
        }
        
        if(value != ""){
            if(type === ""){
                let order_list1 = await Overview.find({
                    method: "1",
                    "$or":[
                        {driver: {$regex: value,  $options: 'i'}},
                    ]
                }).sort({"name": 1});
                let order_list2 = await Overview.find({
                    method: "4",
                    "$or":[
                        {driver: {$regex: value,  $options: 'i'}},
                    ]
                }).sort({"name": 1});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            if(type != ""){
                let order_list1 = await Overview.find({
                    type: type,
                    method: "1",
                    "$or":[
                        {driver: {$regex: value,  $options: 'i'}},
                    ]
                }).sort({"name": 1});
                let order_list2 = await Overview.find({
                    type: type,
                    method: "4",
                    "$or":[
                        {driver: {$regex: value,  $options: 'i'}},
                    ]
                }).sort({"name": 1});
                let order_list = [...order_list1, ...order_list2]
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
        
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            
    
        }
        
    } catch (error) {
        return next(error);
    }
}


const getCommentMoreDaySelect = async(req, res, next) => {
    try {
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
        

        if(value === ""){
            if(type ===""){
                let order_list = await Overview.find({state_comment: true});

            
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.updatedAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            if(type !=""){
                let order_list = await Overview.find({state_comment: true, type: type});

            
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.updatedAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
                }
            
        }

        if(value !=""){
            if(type ===""){
                let order_list = await Overview.find({
                    state_comment: true,
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                    ]
                });
                
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            if(type !=""){
                let order_list = await Overview.find({
                    state_comment: true,
                    type: type,
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                    ]
                });
                
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            
        }
        

    } catch (error) {
        return next(error);
    }
}


const getCustomerMoreDaySelect = async(req, res, next) => {
    try {
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;
      



        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
        if(value ===""){
            if(type  === ""){
                let order_list = await Overview.find().sort({"phonenumber": 1});
        
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })

                return res.send(or);

            }
            if(type != ""){
                let order_list = await Overview.find({type: type}).sort({"phonenumber": 1});
        
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })

                return res.send(or);
                
            }
            
        }

        if(value != ""){
            if(type  === ""){
                let order_list = await Overview.find({
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {address: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                    ]
                })
            
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
            if(type != ""){
                let order_list = await Overview.find({
                    type: type,
                    "$or":[
                        {name: {$regex: value,  $options: 'i'}},
                        {phonenumber: {$regex: value,  $options: 'i'}},
                        {address: {$regex: value,  $options: 'i'}},
                        {product: {$regex: value,  $options: 'i'}},
                    ]
                })
            
                const list_order = array.map(d=>{
                    const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                        list.push(order_day);
                        }
                    
                    })
                    return list;
                    
                        
                })
    
                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        or.push(i)
                    })
                })
                return res.send(or);
            }
           
            
        }
    } catch (error) {
        return next(error);
    }
}


const getProductMoreDaySelect = async(req, res, next) => {
    try {
        const type = req.query.type;
        const method = req.query.method;
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        let  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        

            // if(type === ""){
            //     let order_list = await Overview.find({method: method})
            //     // console.log(order_list)
            //     // return res.send(order_list);
            //     const list_order = array.map(d=>{
            //         const list = []
            //                 const all_order = order_list.map((order_day)=>{
            //                     const complete = (order_day.createdAt)
            //                     const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
            //                     if((complete_day === d  ) && (order_day!= null)){
            //                        list.push(order_day);
            //                     }
                            
            //                 })
            //                 return list;  
            //             })
        
            //             const or = []
            //             list_order.map(item=>{
            //                 item.map(i=>{
            //                     if(i.idproduct!=""){
            //                         or.push(i.idproduct)
            //                     }
                                
            //                 })
            //             })
    
            //             // console.log(or)
            //             const indexof_product = Array.from(new Set(or));
    
            //             const list_productdriver = []
    
    
            //             // const list_product = indexof_product.map(async item=>{
            //             //     const productdriver = await ProductDriver.findById(item)
                            
            //             // }
            //             // )
    
            //             for(let i=0; i< indexof_product.length; i++){
            //                 const productdriver = await ProductDriver.findById(indexof_product[i])
            //                 list_productdriver.push(productdriver)
            //             }
            //             console.log(list_productdriver)
            //             res.send(list_productdriver)
            //         }
           
            let order_list = await Overview.find({
                type: type,
                "$or":[
                    {driver: {$regex: value,  $options: 'i'}},
                ]
            })

           

            const list_order = array.map(d=>{
                const list = []
                const all_order = order_list.map((order_day)=>{
                    const complete = (order_day.createdAt)
                    const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                    if((complete_day === d  )){
                        list.push(order_day);
                    }
                
                })
                return list;
                
                    
            })

            // const or = []
            // list_order.map(item=>{
            //     item.map(i=>{
            //         or.push(i)
            //     })
            // })
            console.log(list_order)
            return res.send(list_order);

           
            // console.log(order_list)
            // return res.send(order_list);
            // const list_order = array.map(d=>{
            //     // const list = []
            //             const all_order = order_list.map((order_day)=>{
            //                 const complete = (order_day.createdAt)
            //                 const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
            //                 if(complete_day === d){
            //                    return order_day;
            //                 }
                        
            //             })
                
                  
            //         })
            //         console.log(all_order)
            //         return res.send(all_order)

                   
    
                    // const or = []
                    // list_order.map(item=>{
                    //     item.map(i=>{
                    //         if(i.idproduct!=""){
                    //             or.push(i.idproduct)
                    //         }
                            
                    //     })
                    // })

                    // // console.log(or)
                    // const indexof_product = Array.from(new Set(or));

                    // const list_productdriver = []


                    // // const list_product = indexof_product.map(async item=>{
                    // //     const productdriver = await ProductDriver.findById(item)
                        
                    // // }
                    // // )

                    // for(let i=0; i< indexof_product.length; i++){
                    //     const productdriver = await ProductDriver.findById(indexof_product[i])
                    //     list_productdriver.push(productdriver)
                    // }
                    // console.log(list_productdriver)
                    

        
        // if(method === "1"){
        //     let order_list = await Overview.find({type: type, method: "1"})
        //     // console.log(order_list)
        //     // return res.send(order_list);
        //     const list_order = array.map(d=>{
        //         const list = []
        //                 const all_order = order_list.map((order_day)=>{
        //                     const complete = (order_day.createdAt)
        //                     const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
        //                     if((complete_day === d  ) && (order_day!= null)){
        //                        list.push(order_day);
        //                     }
                        
        //                 })
        //                 return list;  
        //             })
    
        //             const or = []
        //             list_order.map(item=>{
        //                 item.map(i=>{
        //                     if(i.idproduct!=""){
        //                         or.push(i.idproduct)
        //                     }
                            
        //                 })
        //             })

        //             // console.log(or)
        //             const indexof_product = Array.from(new Set(or));

        //             const list_productdriver = []


        //             // const list_product = indexof_product.map(async item=>{
        //             //     const productdriver = await ProductDriver.findById(item)
                        
        //             // }
        //             // )

        //             for(let i=0; i< indexof_product.length; i++){
        //                 const productdriver = await ProductDriver.findById(indexof_product[i])
        //                 list_productdriver.push(productdriver)
        //             }
        //             console.log(list_productdriver)
        //             return res.send(list_productdriver)
        //         }
       
        //     else if(method === "4"){
        //             let order_list = await Overview.find({type: type, method: "4"})
        //                 // console.log(order_list)
        //                 // return res.send(order_list);
        //                 const list_order = array.map(d=>{
        //                     const list = []
        //                             const all_order = order_list.map((order_day)=>{
        //                                 const complete = (order_day.createdAt)
        //                                 const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
        //                                 if((complete_day === d  ) && (order_day!= null)){
        //                                    list.push(order_day);
        //                                 }
                                    
        //                             })
        //                             return list;  
        //                         })
                
        //                         const or = []
        //                         list_order.map(item=>{
        //                             item.map(i=>{
        //                                 if(i.idproduct!=""){
        //                                     or.push(i.idproduct)
        //                                 }
                                        
        //                             })
        //                         })
            
        //                         // console.log(or)
        //                         const indexof_product = Array.from(new Set(or));
            
        //                         const list_productdriver = []
            
            
        //                         // const list_product = indexof_product.map(async item=>{
        //                         //     const productdriver = await ProductDriver.findById(item)
                                    
        //                         // }
        //                         // )
            
        //                         for(let i=0; i< indexof_product.length; i++){
        //                             const productdriver = await ProductDriver.findById(indexof_product[i])
        //                             list_productdriver.push(productdriver)
        //                         }
        //                         console.log(list_productdriver)
        //                         return res.send(list_productdriver)
                                
                    
                                
        //                     }

        //                     else if(method === "2"){
        //                         let order_list = await Overview.find({type: type, method: "2"})
        //                             // console.log(order_list)
        //                             // return res.send(order_list);
        //                             const list_order = array.map(d=>{
        //                                 const list = []
        //                                         const all_order = order_list.map((order_day)=>{
        //                                             const complete = (order_day.createdAt)
        //                                             const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
        //                                             if((complete_day === d  ) && (order_day!= null)){
        //                                                list.push(order_day);
        //                                             }
                                                
        //                                         })
        //                                         return list;  
        //                                     })
                            
        //                                     const or = []
        //                                     list_order.map(item=>{
        //                                         item.map(i=>{
        //                                             if(i.idproduct!=""){
        //                                                 or.push(i.idproduct)
        //                                             }
                                                    
        //                                         })
        //                                     })
                        
        //                                     // console.log(or)
        //                                     const indexof_product = Array.from(new Set(or));
                        
        //                                     const list_productdriver = []
                        
                        
        //                                     // const list_product = indexof_product.map(async item=>{
        //                                     //     const productdriver = await ProductDriver.findById(item)
                                                
        //                                     // }
        //                                     // )
                        
        //                                     for(let i=0; i< indexof_product.length; i++){
        //                                         const productdriver = await Product.findById(indexof_product[i])
        //                                         list_productdriver.push(productdriver)
                                                
        //                                     }
        //                                     console.log(list_productdriver);
                                           
                                            
        //                                     return res.send(list_productdriver)
                                            
        //                                 }

        //                                 else if(method === "3"){
        //                                     let order_list = await Overview.find({type: type, method: "3"})
        //                                         // console.log(order_list)
        //                                         // return res.send(order_list);
        //                                         const list_order = array.map(d=>{
        //                                             const list = []
        //                                                     const all_order = order_list.map((order_day)=>{
        //                                                         const complete = (order_day.createdAt)
        //                                                         const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
        //                                                         if((complete_day === d  ) && (order_day!= null)){
        //                                                            list.push(order_day);
        //                                                         }
                                                            
        //                                                     })
        //                                                     return list;  
        //                                                 })
                                        
        //                                                 const or = []
        //                                                 list_order.map(item=>{
        //                                                     item.map(i=>{
        //                                                         if(i.idproduct!=""){
        //                                                             or.push(i.idproduct)
        //                                                         }
                                                                
        //                                                     })
        //                                                 })
                                    
        //                                                 // console.log(or)
        //                                                 const indexof_product = Array.from(new Set(or));
                                    
        //                                                 const list_productdriver = []
                                    
                                    
                                                       
        //                                                 for(let i=0; i< indexof_product.length; i++){
        //                                                     const productdriver = await Product.findById(indexof_product[i])
        //                                                     list_productdriver.push(productdriver)
        //                                                 }
        //                                                 console.log(list_productdriver)
        //                                                 return res.send(list_productdriver)
                                                        
                                            
                                                        
        //                                             }
                        
            

    } catch (error) {
        return next(error);
    }
}


const getDetailProductMoreDaySelect = async(req, res, next) => {
    try {
        const type = req.query.type;
        const method = req.query.method;
        let start = req.query.start;
        let end = req.query.end;
        

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
        //     if(type === ""){
        //         let order_list = await Overview.find({method: method})
               
        //         const list_order = array.map(d=>{
        //             const list = []
        //                     const all_order = order_list.map((order_day)=>{
        //                         const complete = (order_day.createdAt)
        //                         const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
        //                         if((complete_day === d  ) && (order_day!= null)){
        //                            list.push(order_day);
        //                         }
                            
        //                     })
        //                     return list;  
        //                 })

                       
        
        //                 const or = []
                        
        //                 list_order.map(item=>{
        //                     item.map(i=>{
        //                             or.push(i)
                                    
        //                     })
        //                 })

        //                 let or_arr = [];
        //                 for(let i=0; i<or.length; i++){
        //                     if(or[i] != null){
        //                         or_arr.push(or[i])
        //                     }
        //                     // if(or[i] === null){
        //                     //     or_arr.push("")
        //                     // }
        //                 }

        //                 console.log(or_arr)
    
        //                 return res.send(or_arr)
        //             }
        if(method === "1"){
        let order_list = await Overview.find({type: type, method: "1"})
           
            const list_order = array.map(d=>{
                const list = []
                        const all_order = order_list.map((order_day)=>{
                            const complete = (order_day.createdAt)
                            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                            if((complete_day === d  ) && (order_day!= null)){
                               list.push(order_day);
                            }
                        
                        })
                        return list;  
                    })
                    const or = []
                    list_order.map(item=>{
                        item.map(i=>{
                                or.push(i)     
                        })
                    })
                    return res.send(or)
                }
       
            else if(method === "4"){
                let order_list = await Overview.find({type: type, method: "4"})
                   
                    const list_order = array.map(d=>{
                        const list = []
                                const all_order = order_list.map((order_day)=>{
                                    const complete = (order_day.createdAt)
                                    const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                                    if((complete_day === d  ) && (order_day!= null)){
                                       list.push(order_day);
                                    }
                                
                                })
                                return list;  
                            })
            
                            const or = []
                            list_order.map(item=>{
                                item.map(i=>{
                                        or.push(i)     
                                })
                            })
                            return res.send(or)
 
                        }

                            else if(method === "2"){
                                let order_list = await Overview.find({type: type, method: "2"})
                                   
                                    const list_order = array.map(d=>{
                                        const list = []
                                                const all_order = order_list.map((order_day)=>{
                                                    const complete = (order_day.createdAt)
                                                    const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                                                    if((complete_day === d  ) && (order_day!= null)){
                                                       list.push(order_day);
                                                    }
                                                
                                                })
                                                return list;  
                                            })
                            
                                            const or = []
                                            list_order.map(item=>{
                                                item.map(i=>{
                                                        or.push(i)     
                                                })
                                            })
                                            return res.send(or)
    
                                        }

                                        else if(method === "3"){
                                            let order_list = await Overview.find({type: type, method: "3"})
                                               
                                                const list_order = array.map(d=>{
                                                    const list = []
                                                            const all_order = order_list.map((order_day)=>{
                                                                const complete = (order_day.createdAt)
                                                                const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                                                                if((complete_day === d  ) && (order_day!= null)){
                                                                   list.push(order_day);
                                                                }
                                                            
                                                            })
                                                            return list;  
                                                        })
                                        
                                                        const or = []
                                                        list_order.map(item=>{
                                                            item.map(i=>{
                                                                    or.push(i)     
                                                            })
                                                        }) 
                                                        return res.send(or)
                                                    }
                        
            

    } catch (error) {
        return next(error);
    }
}

const getCarcompanyMoreDaySelect = async(req, res, next) => {
    try {
       
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
       

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
       if(value === ""){
        let order_list = await Overview.find()
        const list_order = array.map(d=>{
            const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;  
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        if(i.idproduct!=""){
                            or.push(i.idproduct)
                        }
                        
                    })
                })

               
                const indexof_product = Array.from(new Set(or));

                const list_productdriver = []
                const list_product = []

                for(let i=0; i< indexof_product.length; i++){
                    const product = await Product.findById(indexof_product[i])
                    list_product.push(product)
                    
                }

                for(let i=0; i< indexof_product.length; i++){
                    const productdriver = await ProductDriver.findById(indexof_product[i])
                    list_productdriver.push(productdriver)
                    
                }

                console.log(list_product)

                const all_product_list = list_product.concat(list_productdriver)
                

                const arr_carcompany = []
                for(let i=0 ; i< all_product_list.length ; i++){
                    if(all_product_list[i] != null){
                        arr_carcompany.push(all_product_list[i])
                    }
                }
                


                const list_product_carcompany = arr_carcompany.map(item=>
                    item.carcompany
                )
                
                const indexof_carcompany = Array.from(new Set(list_product_carcompany));
                
                return res.send(indexof_carcompany)
       }

       if(value != ""){
        let order_list = await Overview.find()
        const list_order = array.map(d=>{
            const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;  
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        if(i.idproduct!=""){
                            or.push(i.idproduct)
                        }
                        
                    })
                })

                const indexof_product = Array.from(new Set(or));

                const list_productdriver = []
                const list_product = []

                for(let i=0; i< indexof_product.length; i++){
                    const product = await Product.findById(indexof_product[i])
                    list_product.push(product)
                    
                }

                for(let i=0; i< indexof_product.length; i++){
                    const productdriver = await ProductDriver.findById(indexof_product[i])
                    list_productdriver.push(productdriver)
                    
                }

                const all_product_list = list_product.concat(list_productdriver)
                const arr_carcompany = []
                for(let i=0 ; i< all_product_list.length ; i++){
                    if(all_product_list[i] != null){
                        arr_carcompany.push(all_product_list[i])
                    }
                }


                const list_product_carcompany = arr_carcompany.map(item=>
                    item.carcompany
                )

               
                const indexof_carcompany = Array.from(new Set(list_product_carcompany));     
                console.log(indexof_carcompany)
                const arr_carcompanys = [];
                for(let i = 0 ; i< indexof_carcompany.length ; i++ ){
                    if(value.toLowerCase() === indexof_carcompany[i].toLowerCase()){
                        arr_carcompanys.push(indexof_carcompany[i])
                    }
                }
       

                return res.send(arr_carcompanys)
       }
           
                    
    } catch (error) {
        return next(error);
    }
}


const getWhereendSelect = async(req, res, next) => {
    try {
       
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
        if(value ===""){
            let order_list = await Overview.find()
            const list_order = array.map(d=>{
                const list = []
                        const all_order = order_list.map((order_day)=>{
                            const complete = (order_day.createdAt)
                            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                            if((complete_day === d  ) && (order_day!= null)){
                               list.push(order_day);
                            }
                        
                        })
                        return list;  
                    })
    
                    const or = []
                    list_order.map(item=>{
                        item.map(i=>{
                            if(i.idproduct!=""){
                                or.push(i.whereend)
                            }
                            
                        })
                    })

                   
                    const indexof_product = Array.from(new Set(or));

                    const list_whereend = []

                    for(let i=0; i< indexof_product.length; i++){
                        const product = await Overview.find({whereend:indexof_product[i]})
                        list_whereend.push(product)
                    }


                    const all_whereend = []
                    for(let i=0; i< list_whereend.length; i++){
                        for(let j=0; j< list_whereend[i].length; j++){
                            all_whereend.push(list_whereend[i][j])
                        }
                    }
    
                    
                    return res.send(all_whereend)
        }

        if(value != ""){
            let order_list = await Overview.find({
                "$or":[
                    {whereend: {$regex: value,  $options: 'i'}},
                ]
            })
            const list_order = array.map(d=>{
                const list = []
                        const all_order = order_list.map((order_day)=>{
                            const complete = (order_day.createdAt)
                            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                            if((complete_day === d  ) && (order_day!= null)){
                               list.push(order_day);
                            }
                        
                        })
                        return list;  
                    })
    
                    const or = []
                    list_order.map(item=>{
                        item.map(i=>{
                            if(i.idproduct!=""){
                                or.push(i.whereend)
                            }
                            
                        })
                    })

                   
                    const indexof_product = Array.from(new Set(or));

                    const list_whereend = []

                    for(let i=0; i< indexof_product.length; i++){
                        const product = await Overview.find({whereend:indexof_product[i]})
                        list_whereend.push(product)
                    }


                    const all_whereend = []
                    for(let i=0; i< list_whereend.length; i++){
                        for(let j=0; j< list_whereend[i].length; j++){
                            all_whereend.push(list_whereend[i][j])
                        }
                    }
                    return res.send(all_whereend)
        }
            
                    
                

         

    } catch (error) {
        return next(error);
    }
}


const getDetailCarcompanyMoreDaySelect = async(req, res, next) => {
    try {
       
        let start = req.query.start;
        let end = req.query.end;
        const value = req.query.value;
        const type = req.query.type;
        
        
        

        const datstart = new Date(start)
        const datend = new Date(end)

        const d1 = datstart.getTime()
        const d2 = datend.getTime()
        let day_less = datstart.getDate()

        const month_year = (datstart.getMonth()+1)+'-'+datstart.getFullYear()
        
      
        const day =  Math.ceil(((d2-d1) / (24*60*60*1000) + 1 ));
        const array = []
        var  i = 0;
        for(i; i < day ; i++){
                array.push(day_less+"-"+month_year)
                day_less++
            }
        
       if(value === ""){
        if(type === ""){
            let order_list = await Overview.find().sort({"type": 1})
            const list_order = array.map(d=>{
                const list = []
                        const all_order = order_list.map((order_day)=>{
                            const complete = (order_day.createdAt)
                            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                            if((complete_day === d  ) && (order_day!= null)){
                               list.push(order_day);
                            }
                        
                        })
                        return list;  
                    })
    
                    const or = []
                    list_order.map(item=>{
                        item.map(i=>{
                            if(i.idproduct!=""){
                                or.push(i.idproduct)
                            }
                            
                        })
                    })
    
                   
                    const indexof_product = Array.from(new Set(or));
    
                    const list_productdriver = []
                    const list_product = []
    
    
                    for(let i=0; i< indexof_product.length; i++){
                        const product = await Product.findById(indexof_product[i])
                        list_product.push(product)
                        
                    }
    
                    for(let i=0; i< indexof_product.length; i++){
                        const productdriver = await ProductDriver.findById(indexof_product[i])
                        list_productdriver.push(productdriver)
                        
                    }
    
                    const all_product_list = list_product.concat(list_productdriver)
                    
    
                    const arr_carcompany = []
                    for(let i=0 ; i< all_product_list.length ; i++){
                        if(all_product_list[i] != null){
                            arr_carcompany.push(all_product_list[i])
                        }
                    }
                    
                    return res.send(arr_carcompany)
        }
        if(type != ""){
            let order_list = await Overview.find({type: type})
            const list_order = array.map(d=>{
                const list = []
                        const all_order = order_list.map((order_day)=>{
                            const complete = (order_day.createdAt)
                            const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                            if((complete_day === d  ) && (order_day!= null)){
                               list.push(order_day);
                            }
                        
                        })
                        return list;  
                    })
    
                    const or = []
                    list_order.map(item=>{
                        item.map(i=>{
                            if(i.idproduct!=""){
                                or.push(i.idproduct)
                            }
                            
                        })
                    })
    
                   
                    const indexof_product = Array.from(new Set(or));
    
                    const list_productdriver = []
                    const list_product = []
    
    
                    for(let i=0; i< indexof_product.length; i++){
                        const product = await Product.findById(indexof_product[i])
                        list_product.push(product)
                        
                    }
    
                    for(let i=0; i< indexof_product.length; i++){
                        const productdriver = await ProductDriver.findById(indexof_product[i])
                        list_productdriver.push(productdriver)
                        
                    }
    
                    const all_product_list = list_product.concat(list_productdriver)
                    
    
                    const arr_carcompany = []
                    for(let i=0 ; i< all_product_list.length ; i++){
                        if(all_product_list[i] != null){
                            arr_carcompany.push(all_product_list[i])
                        }
                    }
                    
                    return res.send(arr_carcompany)
        }
       
       }

       if(value !=""){
        if(type === ""){
            let order_list = await Overview.find().sort({"type": 1})
        const list_order = array.map(d=>{
            const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;  
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        if(i.idproduct!=""){
                            or.push(i.idproduct)
                        }
                        
                    })
                })

               
                const indexof_product = Array.from(new Set(or));

                const list_productdriver = []
                const list_product = []

                for(let i=0; i< indexof_product.length; i++){
                    const product = await Product.findById(indexof_product[i])
                    list_product.push(product)
                    
                }

                for(let i=0; i< indexof_product.length; i++){
                    const productdriver = await ProductDriver.findById(indexof_product[i])
                    list_productdriver.push(productdriver)
                    
                }

                const all_product_list = list_product.concat(list_productdriver)
                
                const arr_carcompany = []
                for(let i=0 ; i< all_product_list.length ; i++){
                    if(all_product_list[i] != null){
                        arr_carcompany.push(all_product_list[i])
                    }
                }

                const arr_carcompanys = [];
                for(let i = 0 ; i< arr_carcompany.length ; i++ ){
                    if(value.toLowerCase() === arr_carcompany[i].carcompany.toLowerCase()){
                        arr_carcompanys.push(arr_carcompany[i])
                    }
                }
                return res.send(arr_carcompanys)
        }
        if(type != ""){
            let order_list = await Overview.find({type: type})
            const list_order = array.map(d=>{
            const list = []
                    const all_order = order_list.map((order_day)=>{
                        const complete = (order_day.createdAt)
                        const complete_day = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                        if((complete_day === d  ) && (order_day!= null)){
                           list.push(order_day);
                        }
                    
                    })
                    return list;  
                })

                const or = []
                list_order.map(item=>{
                    item.map(i=>{
                        if(i.idproduct!=""){
                            or.push(i.idproduct)
                        }
                        
                    })
                })

               
                const indexof_product = Array.from(new Set(or));

                const list_productdriver = []
                const list_product = []

                for(let i=0; i< indexof_product.length; i++){
                    const product = await Product.findById(indexof_product[i])
                    list_product.push(product)
                    
                }

                for(let i=0; i< indexof_product.length; i++){
                    const productdriver = await ProductDriver.findById(indexof_product[i])
                    list_productdriver.push(productdriver)
                    
                }

                const all_product_list = list_product.concat(list_productdriver)
                
                const arr_carcompany = []
                for(let i=0 ; i< all_product_list.length ; i++){
                    if(all_product_list[i] != null){
                        arr_carcompany.push(all_product_list[i])
                    }
                }

                const arr_carcompanys = [];
                for(let i = 0 ; i< arr_carcompany.length ; i++ ){
                    if(value.toLowerCase() === arr_carcompany[i].carcompany.toLowerCase()){
                        arr_carcompanys.push(arr_carcompany[i])
                    }
                }
                return res.send(arr_carcompanys)
        }
        
       }
           
                    
                

         

    } catch (error) {
        return next(error);
    }
}


const commentProduct = async (req, res, next) => {
    try{
        const updateDoc = {
            comment:req.body.comment,
            star: req.body.star,
            state_comment: true
        }
        console.log("updateDoc", updateDoc)
        const options = {returnDocument: "after"};
        const update = await Overview.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    }catch(error){
        return next(new ApiError(500,"Có lỗi xảy ra khi đánh giá!"));
    }
}


const getOverviewById = async(req, res, next) => {
    try {
        const detailOrder = await Overview.findById(req.params.id);
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

const getCommentListById = async(req, res, next) => {
    try {
        const detailOrder = await Overview.find({idproduct:req.params.id, state_comment: true}).sort({createdAt: -1}).limit(8);
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}

const getOrderByOrderNumber = async(req, res, next) => {
    try {
       
        const detailOrder = await Overview.findOne({ordernumber: req.params.ordernumber});
        console.log(detailOrder)
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}


const getDriverListByMonth = async(req, res, next) => {
    try {
        let month = req.query.month;
        let year = req.query.year;

        day = month+"-"+year;
        
            let order_list = await Overview.find({iddriver: req.params.id});
        
                const list = []
                const all_order = order_list.map((order_day)=>{
                    const complete = (order_day.createdAt)
                    const complete_day = (complete.getMonth()+1)+'-'+complete.getFullYear();
                    if((complete_day === day )){
                        list.push(order_day);
                    }
                })
            let or = 0;
            for(let i=0 ; i< list.length ; i++){
                if(list[i] != null){
                    or = or + list[i].total
                }
            }
            console.log(or)

            return res.send(or);

    } catch (error) {
        return next(error);
    }
}


const getOrderCompleteByDay = async(req, res, next) => {
    try {
        const day = req.query.day
        const month = req.query.month
        const year = req.query.year
        const key = req.query.key
        const date = day+'-'+month+'-'+year;


        if(key === ""){
            if( day === "" && month === "" && year === ""){
                const order_list = await Overview.find().sort({"createdAt": -1});
                return res.send( order_list );
            }else{
                const order_list = await Overview.find().sort({"createdAt": -1});
                const all_order = order_list.map((order)=>{
                    const complete = (order.createdAt)
                    const complete_today = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                    if(complete_today === date){
                        return order;
                    }
                })
    
                const or =[];
                for(let i=0; i< all_order.length; i++){
                    if(all_order[i] != null){
                        or.push(all_order[i])
                    }
                }
        
                return res.send(or);
            }
        }

        else{
            if( day === "" && month === "" && year === ""){
                const order_list = await Overview.find({
                    "$or":[
                        {name: {$regex:req.query.key,  $options: 'i'}},
                        {product: {$regex:req.query.key,  $options: 'i'}},
                        {color: {$regex:req.query.key,  $options: 'i'}},
                        {phonenumber: {$regex:req.query.key,  $options: 'i'}},
                        {whereend: {$regex:req.query.key,  $options: 'i'}},
                        {address: {$regex:req.query.key,  $options: 'i'}},
                        {driverlicense: {$regex:req.query.key,  $options: 'i'}},
                        
                        // {: {$regex:req.query.keyword,  $options: 'i'}},
                    ]
                }).sort({"createdAt": -1});
                return res.send( order_list );
            }else{
                const order_list = await Overview.find({
                    "$or":[
                        {name: {$regex:req.query.key,  $options: 'i'}},
                        {product: {$regex:req.query.key,  $options: 'i'}},
                        {color: {$regex:req.query.key,  $options: 'i'}},
                        {phonenumber: {$regex:req.query.key,  $options: 'i'}},
                        {whereend: {$regex:req.query.key,  $options: 'i'}},
                        {address: {$regex:req.query.key,  $options: 'i'}},
                        {driverlicense: {$regex:req.query.key,  $options: 'i'}},
                
                        // {: {$regex:req.query.keyword,  $options: 'i'}},
                    ]
                }).sort({"createdAt": -1});
                const all_order = order_list.map((order)=>{
                    const complete = (order.createdAt)
                    const complete_today = complete.getDate()+'-'+(complete.getMonth()+1)+'-'+complete.getFullYear();
                    if(complete_today === date){
                        return order;
                    }
                })
    
                const or =[];
                for(let i=0; i< all_order.length; i++){
                    if(all_order[i] != null){
                        or.push(all_order[i])
                    }
                }
        
                return res.send(or);
            }
        }

        

       

    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin đơn hàng"));
    }
}


module.exports ={getOrderToDay,
                getOrderByOrderNumber,
                getDriverListByMonth,
                getCommentListById,
                getCommentMoreDaySelect,
                getWhereendSelect, 
                getOverviewById,
                getOrderComlplete, 
                getDetailCarcompanyMoreDaySelect,
                commentProduct, 
                getCarcompanyMoreDaySelect, 
                getProductMoreDaySelect,
                getDetailProductMoreDaySelect, 
                getOrderToDayByMethod,
                getOrderByMonth,
                getOrderByYear, 
                getOrderByMonthSelect,
                getOrderByDaySelect, 
                getOrderMostProduct, 
                getOrderMostProductDriver, 
                getOverviewByPhoneNumber,
                getOrderMoreDaySelect, 
                getDriverMoreDaySelect, 
                getCustomerMoreDaySelect,
                getOrderCompleteByDay,
                getOrderDriverMoreDaySelect
}

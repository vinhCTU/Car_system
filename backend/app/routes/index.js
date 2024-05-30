const Product = require("./product");
const ProductDriver = require("./productdriver");
const Auth = require("./auth");
const Overview = require("./overview");
const Customer = require("./customer");
const Order = require("./order");
const OrderCancel = require("./order_cancel");
const ProductCategory = require("./product_category");
const Sale = require("./sale");

const Contact = require("./contact")
const Admin = require("./admin")
const Pricelist = require("./pricelist")

const routes = (app) => {

//route admin
app.use("/api/admin", Admin);
//route tài khoản
app.use("/api/auth", Auth);

//route cho api order
app.use("/api/overviews", Overview);

app.use("/api/customers", Customer);


//route sản phẩm
app.use("/api/products", Product);

app.use("/api/productdrivers", ProductDriver);

app.use("/api/pricelists", Pricelist);


//route cho api order
app.use("/api/orders", Order);

app.use("/api/ordercancels", OrderCancel);

//route loại sản phẩm
app.use("/api/productcategory",ProductCategory);

app.use("/api/contact",Contact);

app.use("/api/sale", Sale);

}

module.exports = routes;
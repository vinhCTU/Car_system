const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const mongoose = require('mongoose');
const config = require("./app/config");
const routes = require("./app/routes/index.js")
const multer = require('multer');
const path = require("path")


const app = express();

app.use(cors());
app.use(express.json());

routes(app);



mongoose.connect(config.db.uri)
.then(()=>{
  const PORT = config.app.port;
  app.listen(PORT, () =>{
      console.log(`Server is listening on port: ${PORT}`)
  })
}).catch((err)=>{
  console.log("Kết nối thất bại!")
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to home page" });
});

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
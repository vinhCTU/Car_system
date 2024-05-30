const config = {
    app: {
        port: process.env.PORT || 3001 //PORT
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book_car" //connection string
    }
};

module.exports = config;
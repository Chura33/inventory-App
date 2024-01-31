const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require ('dotenv').config();
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require ("path");
const connect = require("./connectDB");
// const { contactRouter } = require("./routes/contact.route");
const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    origin:['http://localhost:3000'],
    credentials: true
}))

app.get("/", (req, res)=>{
    res.status(200).send("welcome to the homepage")
})
// o
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/products",require ("./routes/product.route"))
app.use("/api/users",  require("./routes/user.route"))
app.use("/api/contactus",  require("./routes/contact.route"))

// error middleware
app.use(errorHandler);
connect().then(()=>{
    app.listen(5000, ()=>{
        console.log("the app is listening on port 5000")
    })  
})
module.exports = app;
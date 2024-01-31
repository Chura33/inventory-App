const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI;
const connect = async()=>{
    try {
        const response = await mongoose.connect(mongoURI);
        console.log("connected to the database")
    } catch (error) {
        console.log(error)        
    }
}

module.exports = connect;
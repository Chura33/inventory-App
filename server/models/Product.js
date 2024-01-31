const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:  true,
    },
    name:{
        type: String,
        required: [true, "please add a name"],
        trim:true
    },
    sku:{
        type: String,
        required: true,
        default: 'SKU', 
        trim: true
    },
    description:{
        type: String,
        required: [true, "please add a description"]
    },
    category:{
        type: String,
        required: [true, "please add a category"]
    },
    quantity:{
        type: String,
        required: [true, "please add a quantity"],
    },
    price:{
        type: String,
        required: [true, "please add a price"],
        trim: true
    },
    image:{
        type: Object,
        default: {}
    },
   
},
{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
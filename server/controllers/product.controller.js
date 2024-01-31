// importing the product model
const Product = require('../models/Product');
const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require("cloudinary").v2;

const getAllProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({user:req.user.id}).sort("-createdAt");
    res.status(200).json(products)
})

const getProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findOne({_id:req.params.id})
    if (!product){
        res.status(404)
        throw new Error("product not found")
    }

    if (product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    res.status(200).json({product});
})

const createProduct = asyncHandler(async (req,res)=>{
    
         // Extract data from the request body
        const { name,sku, category, description, quantity, price} = req.body;
        // validation
        if (!name || !category || !quantity || !price || !description){
            res.status(400)
            throw new Error ("please fill in all fields")
        }

        // manage image upload

        let fileData = {};
        if(req.file){
            // save image to cloudinary
            let uploadedFile;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: "image"})
                
            } catch (error) {
                res.status(500)
                throw new Error("Image could not be uploaded");
            }    
            fileData = {
                fileName:  req.file.originalname,
                filePath:  uploadedFile.secure_url,
                fileType:  req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            }
        }
         // Create a new product instance
        const product = new Product({
            user: req.user.id,
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: fileData
        });
        
        // save the new product

        const savedProduct = await product.save();
        // Respond with the saved product data
        res.status(201).json(savedProduct);

  
})


//  Handle a PUT request to update a product
const updateProduct = asyncHandler(async (req,res)=>{
    console.log(req.body)
    // Extract data from the request body
    const { name,category, description, quantity, price} = req.body;
    const {id} =req.params
    const product = await Product.findById(id)
//    if product does not exist

   if (!product){
    res.status(404)
    throw new Error("product not found")
}
// match product to it's user
if (product.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("User not authorized")
}
  

   // handle image upload

   let fileData = {};
   if(req.file){
       // save image to cloudinary
       let uploadedFile;
       try {
           uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: "image"})
           
       } catch (error) {
           res.status(500)
           throw new Error("Image could not be uploaded");
       }    
       fileData = {
           fileName:  req.file.originalname,
           filePath:  uploadedFile.secure_url,
           fileType:  req.file.mimetype,
           fileSize: fileSizeFormatter(req.file.size, 2),
       }
   }
    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id:id},
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product.image:fileData,  
        },
        {
            new: true,
            runValidators: true
        }
    )
 
   res.status(200).json(updatedProduct);
})

// delete a product

const deleteProduct = asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id)
    // console.log(product)
    if (!product){
        res.status(404);
        throw new Error("product not found");
    }

    if (product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized")
    }
    await Product.deleteOne({_id: req.params.id})
    res.status(200).json({message: "product deleted"});
})

module.exports = {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct}
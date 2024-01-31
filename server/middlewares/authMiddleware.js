const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async(req, res, next)=>{
    // console.log("protest")
    try {
        const token = req.cookies.token
        if (!token){
            res.status(401)
            throw new Error ("Not authorized, please login")
        }

        // verify token
        const verified  = jwt.verify(token,  process.env.JWT_SECRET);
        // GET user id from token
        const user = await User.findById(verified.id).select("-password");
        // console.log(user)

        if (!user){
            res.status(401)
            throw new Error("user not found")
        }

        req.user = user;
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized, please login")
    }
})

module.exports = protect;
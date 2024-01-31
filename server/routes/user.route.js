const express = require("express");
const {createUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword} = require ("../controllers/user.controller");
const protect = require("../middlewares/authMiddleware");
const UserRouter = express.Router()


UserRouter.post('/register', createUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/logout', logout);
UserRouter.get('/getuser',protect, getUser);
UserRouter.get('/loggedin', loginStatus);
UserRouter.patch('/updateuser',protect, updateUser);
UserRouter.patch('/changepassword',protect, changePassword);
UserRouter.post('/forgotpassword', forgotPassword);
UserRouter.put('/resetpassword/:resetToken', resetPassword);

module.exports = UserRouter;
const express = require("express");
const contactRouter = express.Router()
const protect = require("../middlewares/authMiddleware");
const { contactUs } = require("../controllers/contact.controller");

contactRouter.post('/', protect, contactUs)
module.exports = contactRouter
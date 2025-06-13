const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const cors = require('cors')
const Products = require("./models/productModel")
const Category = require("./models/categoryModel")
const Order = require("./models/orderModel")
dotenv.config()
const {sendForgotPasswordEmail, validEmail} = require('./sendMail')
const Users = require("./models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const routes = require("./Routes")
const router = require('./Routes')
const app = express()

const PORT = process.env.PORT || 6000
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('mongoose DB is connected')
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})


app.use('/api', routes)








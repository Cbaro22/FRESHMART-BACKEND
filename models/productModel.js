const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    description: {type:String, required:true},
    image: {type:String, default:""},
    quantity: {type:Number, default:0},
    inStock: {type:Boolean, default:false},
    category:{type: mongoose.Schema.Types.ObjectId,
         ref: 'Category', 
         required:true}
}, {timestamps:true})

const Products = new mongoose.model('Products', productSchema)

module.exports = Products
const mongoose = require("mongoose")

const orderSchema =new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users',
       required: true },
  items:  [
    {
      productId: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Products',
          required:true}
      
    },
  ],
  totalAmount :{type:String,
     required:true},
  status:{type:String, 
    default:"pending", 
    required:true}
},
{timestamps:true})

const Order = new mongoose.model("Order", orderSchema)

module.exports = Order
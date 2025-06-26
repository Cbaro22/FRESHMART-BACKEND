
const Order = require("../models/orderModel")

const Products = require("../models/productModel")
const Users = require("../models/userModel")

const handleGetAllOrder =  async (req, res)=>{

    try {
        const allOrder = await Order.find()
 res.status(200).json(
    {Message:"Order list"},
     allOrder
)

    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const handleCreateOrder = async (req, res)=>{
try {
    const {id} = req.params
    
    const {user, totalAmount,items, status } = req.body


    if(!user || !totalAmount){
       return  res.status(400).json({message:"Please fill in  the Fields"})
    }

    const accountOwner = await Users.find({user})
    if(!accountOwner){
        return res.status(400).json({message:"Create account"})
    }

    const productAvailable = Products.findOne({id})
    if(!productAvailable){
        return res.status(400).json({Message:"Product is not available"})
    }

    if(productAvailable.inStock < quantity){
        return res.status(400).json({message:"Not enough product in stock"})
    }

     productAvailable.inStock -= quantity,
     productAvailable.save();
      
      const cost = productAvailable.price * quantity

    const newOrder = new Order({user, totalAmount: cost,items, status })
     await newOrder.save()

    res.status(201).json({
        message:"Order Created Successfully",
        newOrder
    })

    
} catch (error) {
    res.status(500).json({message:error.message})
}
      
}

const handleDeleteOrder = async (req, res)=>{
    try {
            const {id} = req.params
    
       const deletedOrder = await Order.findByIdAndDelete(id)
    
        res.status(200).json(
            {
                message:"Deleted Order",
                deletedOrder

            })
        } catch (error) {
            res.status(500).json({message:error.message})
        }
}

module.exports = {
     handleCreateOrder,
     handleGetAllOrder,
     handleDeleteOrder
}
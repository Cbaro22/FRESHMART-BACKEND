
const Order = require("../models/orderModel")

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
    
    const {user, totalAmount,items, status } = req.body

    if(!user || !totalAmount){
       return  res.status(400).json({message:"Please fill in  the Fields"})
    }

    const newOrder = new Order({user, totalAmount,items, status })
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
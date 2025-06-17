const Products = require("../models/productModel")

  const handleGetAllProduct = async (req, res)=>{

    const allProduct = await Products.find()

    res.status(200).json(
        {
            message:"Product List",
          allProduct
        },
        
    )

}

 const handleAddProduct = async (req, res)=>{
    try {
        const {name, price, quantity, inStock, description,image,category} = req.body

    if(!name || !price){
        return res.status(400).json({Message:"Please fill the required fields"})
    }

    const newProduct = new Products({name, price, quantity, inStock, description,image,category})
     
    await newProduct.save()
    res.status(201).json({
        Message:"Successful",
        newProduct

    })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const handleGetOneProduct = async (req, res)=>{
    try {
        const {id} = req.params

    const oneProduct = await Products.findById(id)

    if(!oneProduct){
        return res.status(404).json({message:"Product not found"})
    }

    res.status(200).json({
        Message:"Product available",
        oneProduct
    })
    } catch (error) {
       res.status(500) .json({message:error.message})
    }

}

const handleEditProduct = async (req, res)=>{
       try {
        const {id} = req.params

       const {name, price, quantity, inStock, description,image,category}=req.body

       const editedProduct = await Products.findByIdAndUpdate(id,{name, price, quantity, inStock, description,image,category}, {new:true})

       res.status(201).json(
        {message:"Successful ",
        editedProduct
        }
    )
       } catch (error) {
        res.status(500).json({message:error.message})
       }
}

const handleProductUpdate = async (req, res)=>{
      try {
        const {id} = req.params
      const {name, quantity, inStock,image,price, description,category} = req.body

      existingProduct = await Products.findByIdAndUpdate(id)
      if(existingProduct){
        existingProduct.name = name,
        existingProduct.quantity = quantity,
        existingProduct.inStock = inStock,
        existingProduct.image = image,
        existingProduct.price = price,
        existingProduct.description = description,
        existingProduct.category = category


         await existingProduct.save()

         res.status(201).json({
         message:"Update Successful",
         existingProduct

      })
      } else{
        res.status(404).json({message:"Product not found"})
      }

      } catch (error) {
        res.status(500).json({message:error.message})
      }
     
}

const handleDeleteProduct =  async (req, res)=>{
    try {
        const {id} = req.params

    await Products.findByIdAndDelete(id)

    res.status(200).json({message:"Delete Successful"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    handleAddProduct,
    handleGetAllProduct,
    handleGetOneProduct,
    handleEditProduct,
    handleProductUpdate,
    handleDeleteProduct
}


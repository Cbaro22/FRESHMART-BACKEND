const Category = require("../models/categoryModel")

const handleAddCategory = async (req, res)=>{

    try {
        const {name} = req.body

    const existingCategory = await Category.findOne({name})

    if(existingCategory){
       return res.status(400).json({message:"Category already Exist"})
    }

    const newCategory = new Category({name})

     await newCategory.save()

     res.status(201).json({
        message:"New category successfully created",
        newCategory
    })
    } catch (error) {
        res.statu(500).json({message:"error.message"})
    }
    
}

const handleDeleteCategory = async (req, res)=>{

    try {
        const {id} = req.params

     const deletedItems = await Category.findByIdAndDelete(id)

    res.status(200).json({
        message:"deleted successfully", 
        deletedItems})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

const handleGetAllCategory = async (req, res)=>{
    try {

    const availableCategory = await Category.find()
     res.status(200).json(
        {message:"Category List",
         availableCategory}
        
    )
    } catch (error) {
        res.status(500).json({message:"error.message"})
    }
    
}

module.exports = {
    handleAddCategory,
    handleDeleteCategory,
    handleGetAllCategory
}
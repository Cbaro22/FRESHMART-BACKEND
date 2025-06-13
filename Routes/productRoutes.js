const express = require("express")
const { handleGetAllProduct, handleAddProduct, handleGetOneProduct, handleEditProduct, handleProductUpdate, handleDeleteProduct } = require("../Controllers/productCtrl")
const { authorization, authAdmin } = require("../Middlewares/authMiddleware")

const router = express.Router()

router.get('/all-product', authorization,  handleGetAllProduct)

router.post('/add-product', authAdmin, handleAddProduct)

router.get('/one-product/:id',authorization, handleGetOneProduct)

router.put('/edit-product/:id',authAdmin, handleEditProduct)

router.patch('/update-product/:id', authAdmin,  handleProductUpdate)

router.delete('/delete-product/:id',  authAdmin, handleDeleteProduct)

module.exports = router
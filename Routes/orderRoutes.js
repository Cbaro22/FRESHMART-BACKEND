const express = require('express')
const { handleCreateOrder, handleGetAllOrder, handleDeleteOrder } = require('../Controllers/orderCtrl')
const { authAdmin, authorization } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.post('/create-order',authAdmin,  handleCreateOrder)

router.get('/all-orders',authorization, handleGetAllOrder)

router.delete('/delete-order/:id',authAdmin, handleDeleteOrder)

module.exports = router
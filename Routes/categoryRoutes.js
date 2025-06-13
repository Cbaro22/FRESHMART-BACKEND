const express = require('express')
const { handleAddCategory, handleGetAllCategory, handleDeleteCategory } = require('../Controllers/categoryCtrl')
const { authAdmin, authorization } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.post('/add-category',authAdmin,  handleAddCategory)
router.get('/all-category',authorization,   handleGetAllCategory)
router.delete('/delete-category/:id', authAdmin, handleDeleteCategory)

module.exports = router
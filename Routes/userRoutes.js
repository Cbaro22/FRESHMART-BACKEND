const express = require('express')
const { handleUserRegistration, handleUserLogin, handleForgotPassword, handleResetPassword, handleDeleteUserAccount, handleGetAllUsers } = require('../Controllers/usersCtrl')
const { authorization, authAdmin } = require('../Middlewares/authMiddleware')

const router = express.Router()

router.post('/registration',   handleUserRegistration)

router.post('/login',authorization, handleUserLogin)

router.post('/forgot-password',authorization, handleForgotPassword)

router.patch('/reset-password', authorization,  handleResetPassword)

router.delete('/delete-account:id', authAdmin, handleDeleteUserAccount)

router.get('/all-users',authAdmin, handleGetAllUsers)

module.exports = router
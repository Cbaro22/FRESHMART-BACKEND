const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {sendForgotPasswordEmail, validEmail} = require("../sendMail")
const Users = require("../models/userModel")

const handleUserRegistration = async (req, res)=>{
    

    try {
        const {email, password, firstName,lastName,state,verified,role} = req.body

    if(!email){
        return res.status(400).json({message:"Please enter email"})

        }

        if(!password){
        return res.status(400).json({message:"Please enter password"})
    }

        if(!validEmail){
         return res.status(400).json({message:"Incorrect Email format"})
        }
        
        const existingUser = await  Users.findOne ({email})
    

    if(password.length < 6){
         return res.status(400).json({message:"Password should be a minimum of six (6) characters"})
    }

    
    
if(existingUser){
        return res.status(400).json({message:"Account already exist"})


    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser =  new Users({
        email, 
        password:hashedPassword, 
        firstName,
        lastName,
        state,
        verified,
        role})
      await newUser.save()

      // send Mail

      res.status(201).json({
        message:"User account created successfully",
        newUser:{email,firstName,lastName,state,verified,role}
    })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

 const handleUserLogin = async (req, res)=>{
    try {
        const {email, password} = req.body

        const user = await Users.findOne({email})

        if(!user){
            return res.status(404).json({message:"User account does not exist."})
        }

      const  isMatch = await bcrypt.compare(password, user?.password)
      if(!isMatch) {
        return res.status(400).json({message:"incorrect Email or Password."})
      }

      // Generate Token

      const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN,{expiresIn: "1h"})

      const refreshToken= jwt.sign({user},process.env.REFRESH_TOKEN, {expiresIn: "30d"} )

      res.status(200).json({
        message:"Login Successful",
        accessToken,
        user:{
            email: user?.email,
            lastName: user?.lastName,
            firstName:user?.firstName,
            role: user?.role,
            state:user?.state
        },

        refreshToken
    })
        
    } catch (error) {
       res.status(500) .json({message:error.message})
    }
}

const handleForgotPassword = async (req, res)=>{
    const {email} = req.body

    const user = await Users.findOne({email})

    if(!user){
        return res.status(404).json({message:"User account not found"})
    }


    const accessToken =  jwt.sign(
        {user},
       `${process.env.ACCESS_TOKEN}`,
       {expiresIn:"5m"}
    )
 

    await sendForgotPasswordEmail(email, accessToken)

   res.status(200).json({message:"Please check your Email"})

}

const handleResetPassword = async (req, res) =>{
    const {email, password} = req.body

    const user = await Users.findOne({email})

    if(!user){
        return res.status(400).json({message:"User account not found"})
    }

    const hashedPassword = bcrypt.hash('password', 10)

    user.password = hashedPassword
    await user.save()

    res.status(200).json({message:"Password Reset Successful"})
}

const handleDeleteUserAccount = async (req, res) => {
        try {
            const {id} = req.params

          const deletedUser =  await Users.findByIdAndDelete(id)

            res.json({
                msg: "Deleted Account(s)",
                deletedUser
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    const handleGetAllUsers = async (req, res) =>{
        const getAllUsers = await Users.find()

        res.status(200).json({
            message:"Users List",
            getAllUsers
        })
    }

    module.exports = {
        handleUserRegistration,
        handleUserLogin,
        handleForgotPassword,
        handleResetPassword,
        handleDeleteUserAccount,
        handleGetAllUsers
    }
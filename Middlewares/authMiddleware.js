const jwt = require("jsonwebtoken")

const User = require("../models/userModel") 

const validateRegister = async (req, res, next) =>{

    try {
        const {email, password, firstName,lastName,state,verified,role} = req.body

    const error = []

    if(!email){
        error.push("Please add your email")
    }

    if(!password){
        error.push("Please add your password")
    }

    if(error.length > 0){
        return res.status(400).json({message: errors})
    }

    next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    

}

const authorization = async (req, res, next)=>{
 try {
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({message: "Please login!"})
    }

    const splitToken = token.split(" ")

    const realToken = splitToken[1]

    const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`)

    if(!decoded){
        return res.status(401).json({message: "Please login!"})
    }

    const user = await User.findById(decoded.id)


    if(!user){
        return res.status(404).json({message: "User account does not exist"})
     }

      next()
 } catch (error) {
    res.status(500).js({message:error.message})
 }
    
    }


    const authAdmin = async (req, res, next) => {
    try {

        const user = await User.findOne({_id: req.user.id})

        if(user.role !== Admin) 
            return res.status(500).json({message:"Invalid Authorization"})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
validateRegister, 
authorization, 
authAdmin
}
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    firstName:{type:String, default:""},
    lastName:{type:String, default:""},
    state:{type:String, default:""},
    verified:{type:String, default:false},
    role:{type:String, default:"user"}
}, {timestamps: true})

const Users = new mongoose.model('Users', userSchema)

module.exports =  Users
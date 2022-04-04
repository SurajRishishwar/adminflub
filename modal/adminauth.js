const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    adminid:{
        type:String,
        required:true
    }
});

const adminauth = mongoose.model('adminauth',adminSchema);
module.exports = adminauth;
const mongoose = require('mongoose');
const regbyadminSchema = new mongoose.Schema({
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
    houseno:{
        type:String,
        required:true
    },
    ward:{
        type:Number,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    uhn:{
        type:String,
    },
   

}, {
    timestamps:true
});

const regbyadmin = mongoose.model('regbyadmin',regbyadminSchema);
module.exports = regbyadmin;
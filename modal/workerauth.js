const mongoose = require('mongoose');
const workerSchema = new mongoose.Schema({
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
    workerid:{
        type:String,
        required:true
    }
});

const workerauth = mongoose.model('workerauth',workerSchema);
module.exports = workerauth;
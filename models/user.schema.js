const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    }
})

const User= mongoose.model("user", UserSchema);
module.exports=User
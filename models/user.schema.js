const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        min:[10,"Phone number should be 10 digits"],
        max:[10,"Phone number should be 10 digits"],
        required:true
    },
    id:{
        type:Number,
        required:true,
        unique: true,
    }
})

const User= mongoose.model("user", UserSchema);
module.exports=User
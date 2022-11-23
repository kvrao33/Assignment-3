const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    uid:{
        type:Number,
        required:true,
        unique: true,
    }
})

const User= mongoose.model("user", UserSchema);
module.exports=User
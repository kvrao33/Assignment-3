const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderItemSchema=new Schema({
    itemInfo:{
        type: Schema.Types.ObjectId,
        ref: "items", 
    },
    itemCount:{
        type:Number,
        default:1
    },
    orderDate:{
        type:String,
        default:new Date()
    }
})
orderItemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
const carItemSchema=new Schema({
    itemInfo:{
        type: Schema.Types.ObjectId,
        ref: "items", 
    },
    itemCount:{
        type:Number,
        default:1
    },
    addDate:{
        type:String,
        default:new Date()
    }
})
carItemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

const UserSchema=new Schema({
    userName:{
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
    },
    carItem:{
        type:[carItemSchema]
    },
    orderItem:{
        type:[orderItemSchema]
    }
})



UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

const User= mongoose.model("user", UserSchema);
module.exports=User
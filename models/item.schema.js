const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    discountAmount:{
        type:Number,
        required:true
    }
})
itemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

const Items= mongoose.model("items", itemSchema);
module.exports=Items
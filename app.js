require('dotenv').config()
const express=require('express')
const mongoose = require("mongoose");
const app=express()
app.use(express.json())

//Mongodb connection 
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb+srv://KVRao:9342607939@cluster0.lh5zhqw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

app.use("/user",require('./routes/user.route'))//User routes endpoints
module.exports= app.listen(1414,()=>{
    console.log("Server Running");
})

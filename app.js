require('dotenv').config()
const express=require('express')
const mongoose = require("mongoose");
const app=express()
app.use(express.json())

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.URI, {
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

// app.use("/user")
app.listen(1414,()=>{
    console.log("Server Running");
})
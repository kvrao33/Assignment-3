const express=require('express');
const router=express.Router();
const User=require('../models/user.schema')
const {postDataValidation,validate,putDataValidation}=require("../middlewares/middleware");
const {logger}=require('../controller/logger')

//Create user POST method 
router.post("/",postDataValidation(),validate,async (req,res)=>{
    let {uid}=req.body;
   
        let data = await User.findOne({ uid }).exec();//checking user ID is exist or not
        if(data){
            logger.log("error","User ID is already exist")
            res.status(400).send({message:"user id is already exist"})
        }
        else{
         let user = new User(req.body);//creating new User object using request body data
         //Saving the user data 
         user.save().then(()=>{
            logger.log("info","User created successfully")
            res.status(200).send({message:"user created successfully"})
         }).catch((err)=>{
            if(err){
               logger.log("error","Some error occurred in registration")
                res.status(200).send("Error occurs")
            }
         })
        }

   
})

//Edit user data using PUT method
router.put("/",putDataValidation(),validate,async(req,res)=>{
    let {uid}=req.body;
    
        let data = await User.findOne({ uid }).exec();//checking user id is exist or not
if(data){
//Find and update the data using User ID
   User.findOneAndUpdate({uid},req.body,{new:true}).then((data)=>{ //promise will return old data by default we should mention it by 
                                                                //" {new:true} for updated data"
    logger.log("info","Data updated successfully")
    res.status(200).send({message:"Data is updated",data})
   }).catch((err)=>{
    logger.log("error","Some error occurred in updating data")
    res.status(400).send({message:"Error occurred"})
   })
}else{
    logger.log("error","User ID does not exist")
    res.status(400).send({message:"User Id does not exist"})//Sending response if User ID does not exist
}
})

//to get all the users
router.get('/',async(req,res)=>{
    User.find().then(data=>{
        logger.log("info","Successfully get the data")
        res.status(200).send({message:"Successfully get the data",data})
    }).catch(err=>{
        logger.log("Error","Error occurred in user GET method")
        res.send(503).send({message:"Error occurred"})
    })
})

module.exports=router;
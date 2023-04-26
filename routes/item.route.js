const express=require('express');
const router=express.Router();
const Items=require('../models/item.schema')
const {postDataValidation,validate,putDataValidation}=require("../middlewares/middleware");
const {logger}=require('../controller/logger')

//Create item POST method 
router.post("/add",validate,async (req,res)=>{
console.log("/add item");
         let item = new Items(req.body);//creating new item object using request body data
         //Saving the item data 
         item.save().then(()=>{
            logger.log("info","item created successfully")
            Items.find().then((data)=>{
                res.status(200).send({message:"item created successfully",data})
            })
         }).catch((err)=>{
            if(err){
                console.log("Error "+err);
               logger.log("error","Some error occurred in adding item "+err)
                res.status(200).send("Error occurs")
            }
         })
        

   
})

router.get("/",validate,async (req,res)=>{
    
                Items.find().then((data)=>{
                    res.status(200).send({message:"item fetch successfully",data})
                })
    })



module.exports=router;
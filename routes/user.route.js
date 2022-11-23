const express=require('express');
const router=express.Router();
const User=require('../models/user.schema')

//User Register 
router.post("/",async (req,res)=>{
    let {name,phone,uid}=req.body;
    if(name&&phone&&uid){
        let data = await User.findOne({ uid }).exec();//checking user id is exist or not
        if(data){
            res.status(400).send({message:"user id is already exist"})
        }
        else{
         let user = new User(req.body);
         user.save().then(()=>{
            res.status(200).send({message:"user registered successfully"})
         }).catch((err)=>{
            if(err){
                console.clear()
                console.log("Error")
                console.log(err);
                res.status(200).send("Error")
            }
         })
        }

    }else{
        res.status(400).send({message:"Fields can't be empty "})
    }
})

//Edit user data
router.put("/",async(req,res)=>{
    let {uid}=req.body;
    if(uid){
        let data = await User.findOne({ uid }).exec();//checking user id is exist or not
if(data){

   User.findOneAndUpdate({uid},req.body,{new:true}).then((data)=>{ //promise will return old data by default we should mention it by " {new:true} "
console.log(data);
res.status(200).send({message:"Data is updated",data})
   }).catch((err)=>{
    console.log(err)
    res.status(400).send({menubar:"Error"})
   })
}
    }else{
        res.status(400).send({message:"User ID can't be empty "})
    } 
})

//to get all the users
router.get('/',async(req,res)=>{
    User.find().then(data=>{
        res.status(200).send({message:"Successfully get the data",data})
    }).catch(err=>{
        res.send(503).send({message:"Error"})
    })
})

module.exports=router;
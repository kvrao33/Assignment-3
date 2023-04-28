const express=require('express');
const router=express.Router();
const User=require('../models/user.schema')
const {loginDataValidation,validate,signUpDataValidation}=require("../middlewares/middleware");
const {logger}=require('../controller/logger');
const userLogin = require('../services/user Services/userLogin.service');
const userSignUp = require('../services/user Services/userSignUp.service');
const {authenticateToken} = require('../middlewares/verifyToken');
const {addToCart,deleteToCart} = require('../services/user Services/userCart.service');

//User Login
router.post("/login",loginDataValidation(),validate,async (req,res)=>{
 userLogin(req,(error,data)=>{
    if(error)
    res.status(error.statusCode).send(error);
    else
    res.status(data.statusCode).send(data)

 })
})

//User signUp
router.post("/signup",signUpDataValidation(),validate,async(req,res)=>{
    console.log("Signup route");
    userSignUp(req,(error,data)=>{
        if(error)
        res.status(error.statusCode).send(error);
        else
        res.status(data.statusCode).send(data)
    })
})

router.post("/cart",async(req,res)=>{
    console.log("Signup route");
    addToCart(req,(error,data)=>{
        if(error)
        res.status(error.statusCode).send(error);
        else
        res.status(data.statusCode).send(data)
    })
})

router.delete("/cart",async(req,res)=>{
    console.log("Signup route");
    deleteToCart(req,(error,data)=>{
        if(error)
        res.status(error.statusCode).send(error);
        else
        res.status(data.statusCode).send(data)
    })
})




module.exports=router;
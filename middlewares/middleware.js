
const { body, validationResult } = require('express-validator');
const {logger}=require('../controller/logger')

//Validation function for POST method 
let signUpDataValidation=()=>{
    return [
        body('email').isEmail().withMessage("Email should be correct"),
        body("password").isLength({min:6,max:15}).withMessage("Password should be correct")
      ]
}

let loginDataValidation=()=>{
  return [
      body('email').isEmail().withMessage("Email should be correct"),
      body("password").isLength({min:6,max:15}).withMessage("Password should be correct")
    ]
}

//Validation function for POST method 
let itemInputValidation=()=>{
  return [
      body('name').notEmpty().withMessage("Item name should be correct"),
      body("description").notEmpty().withMessage("description should be correct"),
      body("type").notEmpty().withMessage("type should be correct"),
      body("image").notEmpty().isURL().withMessage("image Url should be correct"),
      body("amount").notEmpty().isNumeric().withMessage("Amount should be correct and Numeric"),
      body("discountAmount").notEmpty().isNumeric().withMessage("Amount should be correct and Numeric")
    ]
}

//validation function for PUT method
let putDataValidation=()=>{
    return [
        body('uid').notEmpty().isNumeric().withMessage("User Id should be correct"),
        body("phone").isMobilePhone('en-IN').withMessage("Number Should be correct").optional(),
        body("name").isLength({min:3,max:50}).withMessage("Name should be correct").optional(),
        ]
}
//To arrange the Errors for response
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    let errorMessage=""
    
     errors.array().map((err) => {
      errorMessage+=`,${err.msg}`;
      extractedErrors.push({ [err.param]: err.msg })
    });
    return res.status(422).json({
      errors: extractedErrors,
      message:"Validation error please check your input data",
      statusCode:422,
      error:true
    });
  };

module.exports={putDataValidation,validate,itemInputValidation,signUpDataValidation,loginDataValidation};

const { body, validationResult } = require('express-validator');
const {logger}=require('../controller/logger')

//Validation function for POST method 
let postDataValidation=()=>{
    return [
        body('uid').notEmpty().isNumeric().withMessage("User Id should be correct"),
        body("name").isLength({min:3,max:50}).withMessage("Name should be correct"),
        body("phone").isMobilePhone('en-IN').withMessage("Number Should be correct")]
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
  logger.log("error",errorMessage)
    return res.status(422).json({
      errors: extractedErrors,
    });
  };

module.exports={postDataValidation,putDataValidation,validate};
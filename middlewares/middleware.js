
const { body, validationResult } = require('express-validator');

let postDataValidation=()=>{
    return [
        body('uid').notEmpty().isNumeric().withMessage("User Id should be correct"),
        body("name").isLength({min:3,max:50}).withMessage("Name should be correct"),
        body("phone").isMobilePhone('en-IN').withMessage("Number Should be correct")]
}

let putDataValidation=()=>{
    return [
        body('uid').notEmpty().isNumeric().withMessage("User Id should be correct"),
        body("phone").isMobilePhone('en-IN').withMessage("Number Should be correct").optional(),
        body("name").isLength({min:3,max:50}).withMessage("Name should be correct").optional(),
        ]
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    });
  };

module.exports={postDataValidation,putDataValidation,validate};
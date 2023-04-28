const Cryptr = require('cryptr');
const cryptr = new Cryptr("passwordEncryptMadu");
const User=require('../../models/user.schema')

async function userSignUp(req,callback){
    //Encrypting the password 
    req.body.password=cryptr.encrypt(req.body.password)
    let {email}=req.body
   
        let data = await User.findOne({ email }).exec();//checking user Name is exist or not
        if(data){
            return callback({message:"Email ID already Exist",statusCode:403,error:true},null);
         }
        else{
         let user = new User(req.body);//creating new User object using request body data
         //Saving the user data 
         user.save().then(()=>{
            return callback(null,{message:"Login successfully ",statusCode:200,error:false})
         }).catch((err)=>{
            if(err){
                return callback({message:"Internal server error while signing up",statusCode:503,error:true},null);
            }
         })
        }
}

module.exports=userSignUp
const Cryptr = require('cryptr');
const cryptr = new Cryptr("passwordEncryptMadu");
const User=require('../../models/user.schema')
var jwt = require('jsonwebtoken');

async function userLogin(req,callback){
    //checking user name and password is matching 
    console.log(req.body);
    let {password,email}=req.body
    let response = await User.findOne({email}).exec();
    if(response){
        if(cryptr.decrypt(response.password)===password){
            response=response.toJSON()
            delete response.password;
            let jwt_token=jwt.sign(response, 'passwordEncryptMadu', { expiresIn: '300h' });
            return callback(null,{response,message:"Login successfully ",statusCode:200,error:false,jwt_token})
        }
        return callback({message:"Invalid Password",statusCode:401,error:true},null);
    }
    return callback({message:"Invalid User Name",statusCode:401,error:true},null);
}

module.exports=userLogin
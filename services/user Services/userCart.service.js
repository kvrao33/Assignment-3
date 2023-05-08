
const User=require('../../models/user.schema')
const Item=require('../../models/item.schema')
var jwt = require('jsonwebtoken');


async function addToCart(req,callback){
    //checking user name and password is matching `
 await User.find({id: req.user.id,"carItem.itemInfo": req.body.itemInfo
 })
 .count().then(async (data)=>{
     if(!data)
     await User.findOneAndUpdate(req.user.id,{$push:{carItem:req.body}},{new:true}).populate({
        path: "carItem",
        populate:[{ path: "itemInfo" }],
      }).then((response)=>{
       return callback(null,{response,message:"Item Added successfully ",statusCode:200,error:false})
    }).catch((err)=>{
        console.log("Error");
        return callback({err,message:"can't  Added the item ",statusCode:400,error:true},null)
    })
    else
    return callback({message:"Item already there in the cart",statusCode:400,error:true},null)
 });
   

}
async function deleteToCart(req,callback){
    //checking user name and password is matching 
   let {itemInfo}=req.body;
    console.log(req.body.id);
    let data = await User.findOneAndUpdate(req.user.id,{$pull:{carItem:{itemInfo}}},{new:true}).then((response)=>{
        console.log(response);
       return callback(null,{response,message:"Item Deleted successfully ",statusCode:200,error:false})
    }).catch((err)=>{
        console.log("Error");
        return callback({err,message:"Can't delete the item  ",statusCode:400,error:true},null)
    })

}

module.exports={addToCart,deleteToCart}    
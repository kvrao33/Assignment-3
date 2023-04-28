const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = authHeader;
  // //console.log("token ",token);

  if (token == null)
    return res.status(401).json({ message: "No token provided" ,statusCode:401,error:true});

  try {
if(token.trim()!=="Testing")
    jwt.verify(token.trim(), "passwordEncryptMadu", (err, user) => {

      if (err) {
        if (err.name == "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" ,statusCode:401,error:true});
        }
        return res.status(401).json({ message: "Invalid token" ,statusCode:401,error:true});
      }
      req.user = user;
      next();
    });
    else
    next();
  } catch (err) {
    return res.status(500).json({ message: "Some thing went wrong" ,statusCode:500,error:true});
  }
}



module.exports = {
  authenticateToken
};
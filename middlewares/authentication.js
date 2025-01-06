const { validateToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
  return (req, res,next)=>{
    const tokenCookievalue = req.cookies[cookieName];
    if(!tokenCookievalue){
      next();
    }
    try{
      const userPayload = validateToken(tokenCookievalue)
      req.user = userPayload;
      // next();

    }catch(error){
      next();
    }
  }
}

module.exports ={
  checkForAuthenticationCookie
}
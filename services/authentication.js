const JWT = require("jsonwebtoken")
const secert = "$uperman12233"



function createTokenForUser(user){
  const payload = {
    _id: user.id,
    email:user.email,
    profileImageURL:user.profileImageURL,
    role:user.role,
  }
  const token = JWT.sign(payload,secert)
  return token
}

function validateToken(token){

const payload = JWT.verify(token,secert)
return payload

}
module.exports = {
  createTokenForUser,validateToken
}
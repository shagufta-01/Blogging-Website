const {createHmac,randomBytes} = require('crypto')
const {Schema, model} = require('mongoose');
const { createTokenForUser } = require('../services/authentication');
const userSchema = new Schema({
  fullName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required: true,
    unique:true,
  },
  salt:{
    type:String,
    // require:true,
  },
  password:{
    type:String,
    required: true,
  },
  ProfileImageUrl:{
    type:String,
    default:'/images/avtar.png',
  },
  role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER",
  }
},{timestamps:true});


userSchema.pre('save', function (next) {
  const user = this;
  if(!user.isModified("password")) return next()
const salt = randomBytes(16).toString('hex');
// const salt = "someRandomSalt";
const hashedPassword = createHmac('sha256',salt).update(user.password).digest("hex")

// this.salt =salt;
// this.password= hashedPassword;
// next();
user.salt = salt;
user.password = hashedPassword;
next();
}
)
// Static method to match email and password
userSchema.statics.matchPasswordAndGenerateToken = async function(email,password){
  const user = await this.findOne({email});
  if(!user) throw new Error("user not found")
    // Generate hash using stored salt
//   const salt = user.salt;
// const hashedPassword = user.password;
// const userProvideHash = createHmac("sha256", user.salt).update(password).digest("hex");

  // Generate hash using stored salt
  const userProvidedHash = createHmac('sha256', user.salt).update(password).digest('hex');

 // Compare the hashes
 if (user.password !== userProvidedHash) throw new Error('Incorrect password');

// return {...user, password:undefined, salt:undefined}
// })
const token = createTokenForUser(user);
return token;
  
  // Return user details without sensitive fields
  // const { password: _, salt: __, ...userWithoutSensitiveData } = user.toObject();
  // return userWithoutSensitiveData;
};

const Users = model('user',userSchema);
module.exports = Users
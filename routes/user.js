const express = require('express');
const User= require('../models/user')
const router = express.Router();

router.get("/signin", (req,res)=>{
  return res.render("signin")
})



router.get("/signup", (req,res)=>{
  return res.render("signup")
})


// Handle signup POST request
router.post('/signup', async (req, res) => {
  console.log(req.body)
  const { fullName, email, password } = req.body; // Corrected req.body
  try {
    await User.create({ fullName, email, password }); // Creates a new user
    return res.redirect('/user/signin'); // Redirect to home page on successful signup
  } catch (err) {
    console.error(err);
    return res.status(500).send('Serrrrver error');
  }
});


router.post('/signin', async(req, res)=>{
  const {email, password} = req.body;
  console.log("email",email,"password" ,password)
  // const user = await User.matchPasswordAndGenerateToken(email,password)
  // console.log("users",user)

try {
  const token = await User.matchPasswordAndGenerateToken(email, password); // Assuming this function exists and validates the user

  console.log("token",token)
  try (token) {
    return res.cookie("token",token).redirect('/'); // Redirect to home page on successful signin
  } 
  // else {
  //   return res.status(401).send('Invalid email or password'); // Error for invalid credentials
  // }
} catch (err) {
 return res.render('signin',{
  error:"Incorrect emmail or password"
 })
}
});







// router.post("/signup", async(req,res)=>{
//   const {fullName, email, password} = res.body;
//   await User.create({
//     fullName,email,password
//   })
//   return res.redirect('/')
// })



module.exports = router;
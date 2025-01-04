const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser")
const userRoute= require("./routes/user");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const port = 7000
mongoose.connect('mongodb://localhost:27017/blogging').then((e)=>{
  console.log("MongoDB connnected!")
})
app.use(express.urlencoded({ extended: false })); // For form data
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

// Enable CORS for all routes
app.use(cors());
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get('/',(req,res)=>{
  res.render('home',{

    user:req.user,
  })
})
app.use('/user',userRoute)
app.listen(port,()=>{ console.log(`Server Started at :http://localhost:${port}`)})
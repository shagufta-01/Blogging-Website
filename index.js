const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');

const port = 7000
mongoose.connect('mongodb://localhost:27017/blogging').then((e)=>{
  console.log("MongoDB connnected!")
})
app.use(express.urlencoded({ extended: false })); // For form data
app.use(express.json());


// Enable CORS for all routes
app.use(cors());
const userRoute= require("./routes/user")
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.get('/',(req,res)=>{
  res.render('home')
})
app.use('/user',userRoute)
app.listen(port,()=>{ console.log(`Server Started at :http://localhost:${port}`)})
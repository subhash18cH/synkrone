const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const userRoutes=require("./routes/userRoutes");
const profileRoutes=require("./routes/profileRoutes");
const allProfileRoutes=require("./routes/getAllProfiles");
const swipeRoutes=require("./routes/swipeRoutes");
const dbConnection = require("./db/db");

dbConnection();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",userRoutes);
app.use("/user/profile",profileRoutes);
app.use("/getAll/all-profiles",allProfileRoutes);
app.use("/swipes",swipeRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome to floedev app")
})

app.listen(process.env.PORT,()=>{
  console.log("server is running");
})
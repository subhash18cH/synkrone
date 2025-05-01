const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const userRoutes=require("./routes/userRoutes");
const dbConnection = require("./db/db");

dbConnection();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",userRoutes)

app.get("/",(req,res)=>{
  res.send("Welcome to floedev app")
})

app.listen(process.env.PORT,()=>{
  console.log("server is running");
})
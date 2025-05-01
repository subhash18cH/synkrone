const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
  try {
    const {name,email,password} =req.body;
    if(!name || !email || !password){
      return res.status(400).json({message:"all fields required"});
    };

    const existingUser= await User.findOne({email});

    if(existingUser){
      res.status(400).json({message:"user already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
      name,
      email,
      password:hashedPassword
    });
    res.status(200).json({message:"user registered successfully"});
  } catch (error) {
    res.status(5009).json({message:"something went wrong"});
  }
}

module.exports={registerUser};
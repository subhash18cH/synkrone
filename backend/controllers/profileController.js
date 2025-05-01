const Profile=require("../models/profileModel");

//add user profile
const addUserProfile=async(req,res)=>{
  try {
    const{fullName,profession,about,availability,vision,skills}=req.body;
    if(!fullName || !profession || !about || !availability|| !vision || !skills){
      res.status(400).json({message:"All fields required"});
    }

    const userProfile=await Profile.create({
      fullName,
      profession,
      about,
      availability,
      vision,
      skills,
      userId:req.user.userId
    });

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
}

//get user profile
const getUserProfile=async(req,res)=>{
  try {
    const userProfile=await Profile.findOne({userId:req.user.userId})
    if(!userProfile){
      return res.status(400).json({message:"Profile does not exists"});
    }
    res.status(200).json(userProfile);
  } catch (error) {
    return res.status(400).json({message:"Something went wrong"});
  }
}

//get all profiles
const getAllProfiles=async(req,res)=>{
  try {
    const allProfiles= await Profile.find();
    res.status(200).json(allProfiles);
  } catch (error) {
    res.status(400).json({message:"Error occurs"});
  }
}

//get all developers
const getAllDevelopers=async(req,res)=>{
  try {
    const devProfiles= await Profile.find({profession:"Developer"});
    res.status(200).json(devProfiles);
  } catch (error) {
    res.status(500).json({message:"Error occurs"});
  }
}

//get all marketers
const getAllMarketers=async(req,res)=>{
  try {
    const markProfiles= await Profile.find({profession:"Marketer"});
    res.status(200).json(markProfiles);
  } catch (error) {
    res.status(500).json({message:"Error occurs"});
  }
}

//delete profile
const deleteProfile=async(req,res)=>{
  try {
    const userProfile=await Profile.findOne({userId:req.user.userId});
    if(!userProfile){
      return res.status(400).json({message:"Profile does not exists"});
    }
    await Profile.findOneAndDelete({userId:req.user.userId});
    res.status(200).json({message:"Profile deleted successfully"});
  } catch (error) {
    res.status(400).json({message:"Error occurs"});
  }
}

//update profile
const updateProfile=async(req,res)=>{
  try {
    const profile=await Profile.findOne({userId:req.user.userId});
    if(!profile){
      return res.status(400).json({message:"profile does not exists"});
    }
    const updateProfile=await Profile.findOneAndUpdate({userId:req.user.userId},req.body,{new:true});
    res.status(200).json(updateProfile);
  } catch (error) {
    res.status(400).json({message:"Error occurs"});
  }
}

//get profile by profile id
const getProfileById=async(req,res)=>{
  try {
    const profile=await Profile.findById(req.params.id);
    if(!profile){
      return res.status(400).json({message:"Profile not found"});
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({message:"Error occurs"});
  }
}

module.exports={addUserProfile,getUserProfile,getAllProfiles,getAllDevelopers,getAllMarketers,deleteProfile,updateProfile,getProfileById};
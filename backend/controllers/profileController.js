const Profile=require("../models/profileModel");

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



module.exports={addUserProfile};
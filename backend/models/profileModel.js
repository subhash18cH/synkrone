const mongoose=require("mongoose");

const profileSchema=mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  },
  fullName:{
    type:String,
    required:[true,"name is required"]
  },
  profession:{
    type:String,
    required:[true,"profession is required"],
  },
  about:{
    type:String,
    required:[true,"about is required"]
  },
  availability:{
    type:String,
    required:[true,"availability is required"]
  },
  vision:{
    type:String,
    required:[true,"vision is required"]
  },
  skills:{
    type:[String],
    required:[true,"skills are required"]
  },
})

module.exports=mongoose.model("profile",profileSchema);
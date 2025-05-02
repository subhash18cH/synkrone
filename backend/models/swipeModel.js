const mongoose=require("mongoose");

const swipeSchema=mongoose.Schema({
  fromUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  toUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  isLiked:{
    type:Boolean,
    default:false
  }
})

module.exports=mongoose.model("swipe",swipeSchema);
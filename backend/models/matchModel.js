const mongoose=require("mongoose");

const matchSchema=mongoose.Schema({
  user1:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  user2:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  isMatched:{
    type:Boolean,
    default:false
  }
})

module.exports=mongoose.model("match",matchSchema);
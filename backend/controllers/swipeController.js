const Swipe=require("../models/swipeModel");
const Match =require("../models/matchModel");

//swipe a profile
const swipeProfile=async(req,res)=>{
  try {
    const{targetUserId,isLiked}=req.body;
    if(targetUserId===null){
      return res.status(400).json({message:"User not found"});
    }
    const existingSwipe= await Swipe.findOne({
      fromUser:req.user.userId,
      toUser:targetUserId}
    );
    if(existingSwipe){
      return res.status(400).json({message:"You have already swiped"});
    }
    const swipe= await Swipe.create({
      fromUser:req.user.userId,
      toUser:targetUserId,
      isLiked
    });

    if(isLiked){
      const swipeBacked=await Swipe.findOne({
        fromUser:targetUserId,
        toUser:req.user.userId,
        isLiked:true
      });

      if(swipeBacked){
        await Match.create({
          user1:req.user.userId,
          user2:targetUserId,
          isMatched:true
        })
      }
    };
    res.status(200).json(swipe);
  } catch (error) {
    res.status(400);
  }
}

//all sent requests
const sentRequests=async(req,res)=>{
  try {
    const swipes=await Swipe.find({fromUser:req.user.userId});
    res.status(200).json(swipes);
  } catch (error) {
    res.status(400);
  }
}

//all incoming requests
const receivedRequests=async(req,res)=>{
  try {
    const swipes=await Swipe.find({toUser:req.user.userId});
    res.status(200).json(swipes);
  } catch (error) {
    res.status(400);
  }
}

module.exports={swipeProfile,sentRequests,receivedRequests};
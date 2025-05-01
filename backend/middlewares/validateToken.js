const jwt=require("jsonwebtoken");

const validateToken=async(req,res,next)=>{
  try {
    const authHeader=req.headers["authorization" || "Authorization"];
    const token=authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1];
    if(token===null){
      return res.status(400);
    };

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        return res.status(400);
      }
      req.user={
        email:decoded.email,
        userId:decoded.userId
      };
      next();
    })
  } catch (error) {
    res.status(400).json({message:"Something went wrong"})
  }
}

module.exports={validateToken};
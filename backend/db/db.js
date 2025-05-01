const mongoose=require("mongoose");

const dbConnection=async()=>{
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports=dbConnection;
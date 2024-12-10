const mongoose = require("mongoose");
const { MONGO_DB_URI } = require("./constant");
const connectDB=async()=>{
    await mongoose
    try {
        await mongoose.connect(MONGO_DB_URI);
      console.log("Database Connected.")
        
    } catch (error) {
        console.log("Database Connection Error",error);
    }

}
module.exports=connectDB;


import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function connectDB(): Promise<void>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL!)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(`Error: ${err}`);

    }
}



export default connectDB;



import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async()=>{
    try{

        const url = process.env.MONGO_URL
        if(!url){
            throw new Error("env variable not set")
        }

        await mongoose.connect(url)
        console.log("mongoDB connected")

    }catch(error){
        console.log(error)
    }
}

export default connectDB
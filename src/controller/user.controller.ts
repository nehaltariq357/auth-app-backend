import { Request,Response } from "express";
import User from "../model/auth";
import { AuthRequest } from "../types/express";
const profile = async(req:Request,res:Response)=>{
  try {
    const user = await User.find({}).select("-password");

    res.json({
      user
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
}

export default profile
import jwt from "jsonwebtoken"
import User from "../model/auth";
import { generateAccessToken } from "../utlis/jwt";
import { Request,Response } from "express";
import dotenv from "dotenv"


dotenv.config()


const refreshToken= async (req:Request, res:Response) => {
  try {
    const token = req.cookies.refreshToken;
    const secret = process.env.REFRESH_TOKEN_SECRET
    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(token,secret! );

    const user = await User.findById((decoded as jwt.JwtPayload).id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user._id.toString());

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false
    });

    res.json({ message: "Token refreshed" });

  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export default refreshToken
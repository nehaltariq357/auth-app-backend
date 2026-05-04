import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error("JWT secrets missing in .env");
}

const generateAccessToken = (userId:string) => {
  return jwt.sign(
    { id: userId },
    accessTokenSecret,
    {
      expiresIn: "1m",
      algorithm: "HS256",
    }
  );
};

const generateRefreshToken = (userId:string) => {
  return jwt.sign(
    { id: userId },
    refreshTokenSecret,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );
};

export { generateAccessToken, generateRefreshToken };
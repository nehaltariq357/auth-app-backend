import jwt from "jsonwebtoken"
import { Request,Response,NextFunction } from "express";



const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET

    const decoded = jwt.verify(token,secret! ); // ! ---> means trust me this is not undefined

    (req as any).user = decoded; // user attach
    next();

  } catch (error) {
    return res.status(401).json({ message: "token not valid" });
  }
};

export default authMiddleware
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import cors from "cors"

const app = express();
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL, // allow to access from client side
    credentials:true, 
    methods:["GET","POST","PUT","DELETE"]
}))
app.use(express.json());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/user",userRouter)
export default app;
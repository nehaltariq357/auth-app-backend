import e, { Request, Response } from "express"
import User from "../model/auth"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../utlis/jwt"

// register

const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: "User created successfully", user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// login 

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const accessToken = generateAccessToken(user._id.toString())
        const refreshToken = generateRefreshToken(user._id.toString())

        // cookies set

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,  // set to true in production
            sameSite: "none",  // set to "none" in production

        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // set to true in production
            secure: true,   // set to true in production
            sameSite: "none",   // set to "none" in production

        })
        res.status(200).json({
            message: "Login successful", user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" })
    }
}

// logout

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
        })
        res.clearCookie("refreshToken")
        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}




export { register, login, logout }
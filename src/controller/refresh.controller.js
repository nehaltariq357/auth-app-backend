"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../model/auth"));
const jwt_1 = require("../utlis/jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const secret = process.env.REFRESH_TOKEN_SECRET;
        if (!token) {
            return res.status(401).json({ message: "No refresh token" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await auth_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const newAccessToken = (0, jwt_1.generateAccessToken)(user._id.toString());
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false
        });
        res.json({ message: "Token refreshed" });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};
exports.default = refreshToken;

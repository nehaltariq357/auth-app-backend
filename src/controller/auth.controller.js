"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const auth_1 = __importDefault(require("../model/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utlis/jwt");
// register
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await auth_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await auth_1.default.create({
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User created successfully", user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
// login 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user._id.toString());
        const refreshToken = (0, jwt_1.generateRefreshToken)(user._id.toString());
        // cookies set
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({
            message: "Login successful", user: {
                id: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
// logout
const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logout = logout;

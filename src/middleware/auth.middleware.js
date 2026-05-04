"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: "No token, unauthorized" });
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret); // ! ---> means trust me this is not undefined
        req.user = decoded; // user attach
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "token not valid" });
    }
};
exports.default = authMiddleware;

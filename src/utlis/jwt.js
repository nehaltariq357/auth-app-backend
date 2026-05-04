"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("JWT secrets missing in .env");
}
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, accessTokenSecret, {
        expiresIn: "1m",
        algorithm: "HS256",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, refreshTokenSecret, {
        expiresIn: "7d",
        algorithm: "HS256",
    });
};
exports.generateRefreshToken = generateRefreshToken;

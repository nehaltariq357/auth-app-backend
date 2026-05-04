"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        if (!url) {
            throw new Error("env variable not set");
        }
        await mongoose_1.default.connect(url);
        console.log("mongoDB connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDB;

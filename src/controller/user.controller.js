"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../model/auth"));
const profile = async (req, res) => {
    try {
        const user = await auth_1.default.find({}).select("-password");
        res.json({
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};
exports.default = profile;

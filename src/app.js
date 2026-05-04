"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // allow to access from client side
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express_1.default.json());
// routes
app.use("/api/auth", auth_routes_js_1.default);
app.use("/api/user", user_routes_js_1.default);
exports.default = app;

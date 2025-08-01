"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_util_1 = require("../utils/jwt.util");
const user_model_1 = require("../models/user.model");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Missing fields" });
            }
            try {
                const existingUser = yield user_model_1.User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = yield user_model_1.User.create({ username, email, password: hashedPassword });
                return res.status(201).json({
                    message: "User registered",
                    user: { id: newUser._id, username: newUser.username, email: newUser.email }
                });
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield user_model_1.User.findOne({ email });
                if (!user || !user.password) {
                    return res.status(404).json({ message: "User not found or password is missing" });
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                const token = (0, jwt_util_1.generateToken)({
                    id: user._id,
                    email: user.email,
                    username: user.username,
                });
                return res.status(200).json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                });
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({
                message: "Welcome",
                user: req.user,
            });
        });
    }
    googleCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const token = (0, jwt_util_1.generateToken)({
                id: user._id,
                email: user.email,
                username: user.username,
            });
            const clientURL = process.env.CLIENT_URL;
            return res.redirect(`${clientURL}/login/success?token=${token}`);
        });
    }
}
exports.default = new AuthController();

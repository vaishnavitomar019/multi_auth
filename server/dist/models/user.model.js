"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String }, // optional for Google users
    email: { type: String, unique: true, required: true },
    password: { type: String }, // optional for Google users
    googleId: { type: String }, // used only for Google login
    profilePic: { type: String }, // optional: from Google profile
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);

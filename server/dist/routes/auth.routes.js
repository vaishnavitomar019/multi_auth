"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Email/Password Auth
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/profile', auth_middleware_1.verifyToken, (req, res) => {
    res.json({ message: "Welcome", user: req.user });
});
// Google Auth
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/login',
    session: false
}), (req, res) => {
    // Generate JWT for user
    const user = req.user;
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    // You can redirect with token or respond with it
    // res.redirect(`http://localhost:4200/dashboard?token=${token}`);
    res.redirect(`http://localhost:4200/login/success?token=${token}`);
    // or: res.json({ token });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/register', auth_controller_1.default.register);
        this.router.post('/login', auth_controller_1.default.login);
        this.router.get('/profile', auth_middleware_1.AuthMiddleware.verifyToken, auth_controller_1.default.getProfile);
        this.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
        this.router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login', session: false }), auth_controller_1.default.googleCallback);
    }
}
exports.default = new AuthRoutes().router;

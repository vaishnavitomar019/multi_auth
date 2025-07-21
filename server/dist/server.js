"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_config_1 = require("./config/db.config");
dotenv_1.default.config({ path: '../.env' }); // Adjust path based on directory structure
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', auth_routes_1.default);
(0, db_config_1.connectDB)();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running o port ${PORT}`));

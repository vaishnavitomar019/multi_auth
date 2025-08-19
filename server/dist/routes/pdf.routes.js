"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const PdfController_1 = require("../controllers/PdfController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const pdfController = new PdfController_1.PdfController();
router.post('/summarize-pdf', upload.single('file'), pdfController.summarizePdfStream.bind(pdfController));
exports.default = router;

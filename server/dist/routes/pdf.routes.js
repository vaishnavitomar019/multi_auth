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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const openai_utils_1 = require("../utils/openai.utils");
class PdfRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    pdfRoutes() {
        this.router.post('/summarized-pdf');
    }
}
const router = express_1.default.Router();
const summarizer = new openai_utils_1.PdfSummarizer();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/summarize-pdf', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file)
            return res.status(400).json({ error: 'No file uploaded' });
        const data = yield (0, pdf_parse_1.default)(req.file.buffer);
        const maxSafeChars = 24000;
        const trimmedText = data.text.slice(0, maxSafeChars);
        const summary = yield summarizer.summarize(trimmedText);
        res.json({ summary });
    }
    catch (error) {
        console.error('Error:', error.message || error);
        res.status(500).json({ error: error.message || 'Summarization failed' });
    }
}));
exports.default = router;

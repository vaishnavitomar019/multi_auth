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
exports.PdfController = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const openai_utils_1 = require("../utils/openai.utils");
class PdfController {
    constructor() {
        this.summarizer = new openai_utils_1.PdfSummarizer();
        this.summarizePdf = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ error: 'No file uploaded' });
                }
                const data = yield (0, pdf_parse_1.default)(req.file.buffer);
                const maxSafeChars = 24000;
                const trimmedText = data.text.slice(0, maxSafeChars);
                const summary = yield this.summarizer.summarize(trimmedText);
                res.json({ summary });
            }
            catch (error) {
                console.error('Error:', error.message || error);
                res.status(500).json({ error: error.message || 'Summarization failed' });
            }
        });
    }
}
exports.PdfController = PdfController;

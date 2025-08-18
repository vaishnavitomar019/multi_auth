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
exports.PdfSummarizer = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PdfSummarizer {
    constructor() {
        this.endpoint = 'https://api.groq.com/openai/v1/chat/completions';
        this.model = process.env.GROQ_MODEL || 'llama3-8b-8192';
        if (!process.env.GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY is not defined in the environment variables');
        }
    }
    summarize(pdfText) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const response = yield (0, node_fetch_1.default)(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant that summarizes PDF content.' },
                        { role: 'user', content: `Summarize the following PDF content:\n\n${pdfText}` }
                    ],
                }),
            });
            const data = yield response.json();
            console.log("Raw Response:", data);
            if (!response.ok || !data.choices || !((_b = (_a = data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content)) {
                throw new Error('Failed to generate summary: ' + (((_c = data.error) === null || _c === void 0 ? void 0 : _c.message) || 'Unknown error'));
            }
            const summary = data.choices[0].message.content.trim();
            console.log("Return Data:", summary);
            return summary;
        });
    }
}
exports.PdfSummarizer = PdfSummarizer;

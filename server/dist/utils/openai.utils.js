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
        this.endpoint = process.env.OLLAMAENDPOINT || '';
        this.model = process.env.OLLAMAMODEL || 'mistral';
        if (!this.endpoint) {
            throw new Error('OLLAMAENDPOINT is not defined in the environment variables');
        }
    }
    summarize(pdfText) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.model,
                    prompt: `Summarize the following PDF content:\n\n${pdfText}`,
                    stream: false,
                }),
            });
            const data = yield response.json();
            console.log(data);
            if (!response.ok || !data.response) {
                throw new Error('Failed to generate summary: ' + (data.error || 'Unknown error'));
            }
            console.log("Return Data", data.response.trim());
            return data.response.trim();
        });
    }
}
exports.PdfSummarizer = PdfSummarizer;

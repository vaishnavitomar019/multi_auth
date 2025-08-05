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
exports.getPdfSummary = getPdfSummary;
const node_fetch_1 = __importDefault(require("node-fetch"));
function getPdfSummary(pdfText) {
    return __awaiter(this, void 0, void 0, function* () {
        const ollamaEndpoint = 'http://192.168.2.235:11434/api/generate';
        const response = yield (0, node_fetch_1.default)(ollamaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistral',
                prompt: `Summarize the following PDF content:\n\n${pdfText}`,
                stream: false,
            }),
        });
        const data = yield response.json();
        if (!response.ok || !data.response) {
            throw new Error('Failed to generate summary: ' + (data.error || 'Unknown error'));
        }
        return data.response.trim();
    });
}

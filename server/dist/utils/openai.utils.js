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
        var _a;
        const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
        const response = yield (0, node_fetch_1.default)(openaiEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that summarizes PDF documents.',
                    },
                    {
                        role: 'user',
                        content: `Summarize this PDF content:\n\n${pdfText}`,
                    },
                ],
                max_tokens: 500,
                temperature: 0.5,
            }),
        });
        const data = (yield response.json());
        if (!response.ok || !data.choices || !data.choices.length) {
            throw new Error(((_a = data.error) === null || _a === void 0 ? void 0 : _a.message) || 'OpenAI API error');
        }
        return data.choices[0].message.content;
    });
}

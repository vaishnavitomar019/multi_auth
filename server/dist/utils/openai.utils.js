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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
        this.endpoint = process.env.GROQ_API_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
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
            if (!response.ok || !data.choices || !((_b = (_a = data.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content)) {
                throw new Error('Failed to generate summary: ' + (((_c = data.error) === null || _c === void 0 ? void 0 : _c.message) || 'Unknown error'));
            }
            const summary = data.choices[0].message.content.trim();
            console.log("Return Data:", summary);
            return summary;
        });
    }
    summarizeStream(pdfText, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            var _d, _e, _f;
            console.log("utility called");
            const response = yield (0, node_fetch_1.default)(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: this.model,
                    stream: true,
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant that summarizes PDF content.' },
                        { role: 'user', content: `Summarize the following PDF content:\n\n${pdfText}` }
                    ],
                }),
            });
            if (!response.ok || !response.body) {
                throw new Error("Failed to connect to streaming API");
            }
            const decoder = new TextDecoder();
            let buffer = '';
            try {
                for (var _g = true, _h = __asyncValues(response.body), _j; _j = yield _h.next(), _a = _j.done, !_a; _g = true) {
                    _c = _j.value;
                    _g = false;
                    const chunk = _c;
                    buffer += decoder.decode(chunk, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop(); // keep last line (may be incomplete)
                    for (const line of lines) {
                        if (!line.startsWith('data: '))
                            continue;
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]')
                            continue;
                        try {
                            const parsed = JSON.parse(dataStr);
                            const content = (_f = (_e = (_d = parsed.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content;
                            if (content) {
                                res.write(content); // send only the text
                                console.log("Content", content);
                            }
                        }
                        catch (err) {
                            // ignore incomplete JSON, wait for next chunk
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
            }
            res.end();
            console.log("Stream finished");
        });
    }
}
exports.PdfSummarizer = PdfSummarizer;

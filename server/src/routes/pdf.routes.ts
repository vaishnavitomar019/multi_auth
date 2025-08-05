import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { PdfSummarizer } from '../utils/openai.utils';

class PdfRoutes {
  public router = express.Router();
  constructor() { }

  pdfRoutes() {
    this.router.post('/summarized-pdf',)
  }
}

const router = express.Router();
const summarizer = new PdfSummarizer();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/summarize-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const data = await pdfParse(req.file.buffer);
    const maxSafeChars = 24000;
    const trimmedText = data.text.slice(0, maxSafeChars);

    const summary = await summarizer.summarize(trimmedText);

    res.json({ summary });
  } catch (error: any) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Summarization failed' });
  }
});

export default router;

import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { getPdfSummary } from '../utils/openai.utils';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/summarize-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const data = await pdfParse(req.file.buffer);
    const trimmedText = data.text.slice(0, 8000); // Prevent token overflow

    const summary = await getPdfSummary(trimmedText);

    res.json({ summary });
  } catch (error: any) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Summarization failed' });
  }
});

export default router;

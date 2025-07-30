import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { getPdfSummary } from '../utils/openai.utils';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/summarize', upload.single('file'), async (req, res) => {
  try {
    let inputText = '';

    // Case 1: PDF file upload
    if (req.file) {
      const data = await pdfParse(req.file.buffer);
      inputText = data.text;
    }

    // Case 2: Plain text input (from a form or textarea)
    else if (req.body.text) {
      inputText = req.body.text;
    }

    // If nothing provided
    else {
      return res.status(400).json({ error: 'No input provided (file or text)' });
    }

    const trimmedText = inputText.slice(0, 8000); // Limit for token safety
    const summary = await getPdfSummary(trimmedText);

    res.json({ summary });

  } catch (error: any) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Summarization failed' });
  }
});

export default router;

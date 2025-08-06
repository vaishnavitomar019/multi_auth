import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import { PdfSummarizer } from '../utils/openai.utils';

export class PdfController {
  private summarizer = new PdfSummarizer();

  public summarizePdf = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const data = await pdfParse(req.file.buffer);
      const maxSafeChars = 24000;
      const trimmedText = data.text.slice(0, maxSafeChars);

      const summary = await this.summarizer.summarize(trimmedText);

      res.json({ summary });
    } catch (error: any) {
      console.error('Error:', error.message || error);
      res.status(500).json({ error: error.message || 'Summarization failed' });
    }
  };
}

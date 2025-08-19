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

  public async summarizePdfStream(req: Request, res: Response) {
    console.log("summarized pdf stream function")
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const data = await pdfParse(req.file.buffer);
      const pdfText = data.text;

      // Set headers for streaming
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      console.log("pdf text", pdfText);
      console.log("calling")
      console.log("calling summarizeStream",this.summarizer);
      await this.summarizer.summarizeStream(pdfText, res);
      console.log("after summarizeStream");
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }


}

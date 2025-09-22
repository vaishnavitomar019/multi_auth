import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
export class PdfSummarizer {
  private endpoint: string;
  private model: string;

  constructor() {
    this.endpoint = process.env.OLLAMAENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
    this.model = process.env.OLLAMA_MODEL || 'llama3-8b-8192';

    // if (!process.env.GROQ_API_KEY) {
    //   throw new Error('GROQ_API_KEY is not defined in the environment variables');
    // }
  }

  public async summarize(pdfText: string): Promise<string> {
    const response = await fetch(this.endpoint, {
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

    const data: any = await response.json();
    if (!response.ok || !data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Failed to generate summary: ' + (data.error?.message || 'Unknown error'));
    }

    const summary = data.choices[0].message.content.trim();
    console.log("Return Data:", summary);
    return summary;
  }

  public async summarizeStream(pdfText: string, res: Response): Promise<void> {
    console.log("utility called");

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        stream: true,
        prompt: `Summarize the content of the following PDF.

Instructions:
1. Provide a clear, concise summary in plain text.
2. Extract any code examples and include them in proper Markdown code blocks using the appropriate language.
3. Number the key points if applicable.
4. Keep the summary easy to read and understandable for a developer audience.

PDF Content:
${pdfText}`
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error("Failed to connect to streaming API");
    }

    const decoder = new TextDecoder();
    console.log("decoder ready");

    for await (const chunk of response.body as any) {
      const text = decoder.decode(chunk, { stream: true });
      console.log("New Chunk received",);
      res.write(`data: ${text}\n`);
    }

    console.log("Stream finished");
    res.end();
  }

}

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
export class PdfSummarizer {
  private endpoint: string;
  private model: string;

  constructor() {
    this.endpoint = process.env.GROQ_API_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
    this.model = process.env.GROQ_MODEL || 'llama3-8b-8192';

    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not defined in the environment variables');
    }
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

    for await (const chunk of response.body as any) {
      buffer += decoder.decode(chunk, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop()!; // keep last line (may be incomplete)

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const dataStr = line.replace('data: ', '').trim();
        if (dataStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(dataStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(content); // send only the text
            console.log("Content", content)
          }
        } catch (err) {

        }
      }
    }

    res.end();
    console.log("Stream finished");
  }


}

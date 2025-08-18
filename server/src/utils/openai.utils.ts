import fetch from 'node-fetch';
import dotenv from 'dotenv';

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
    console.log("Raw Response:", data);

    if (!response.ok || !data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Failed to generate summary: ' + (data.error?.message || 'Unknown error'));
    }

    const summary = data.choices[0].message.content.trim();
    console.log("Return Data:", summary);
    return summary;
  }
}

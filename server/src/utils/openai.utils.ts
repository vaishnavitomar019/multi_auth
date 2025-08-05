import fetch from 'node-fetch';
export class PdfSummarizer {
  private endpoint: string;
  private model: string;

  constructor() {
    this.endpoint = process.env.OLLAMAENDPOINT || '';
    this.model = process.env.OLLAMAMODEL || 'mistral';

    if (!this.endpoint) {
      throw new Error('OLLAMAENDPOINT is not defined in the environment variables');
    }
  }

  public async summarize(pdfText: string): Promise<string> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt: `Summarize the following PDF content:\n\n${pdfText}`,
        stream: false,
      }),
    });

    const data: any = await response.json();

    if (!response.ok || !data.response) {
      throw new Error('Failed to generate summary: ' + (data.error || 'Unknown error'));
    }

    return data.response.trim();
  }
}


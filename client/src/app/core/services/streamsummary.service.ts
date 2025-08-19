import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamsummaryService {
  public baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  async streamFile(
    file: File,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/summarize-pdf`, {
      method: 'POST',
      body: formData
    });

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = text.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        const dataStr = line.replace('data: ', '').trim();
        if (dataStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(dataStr);
          const delta = parsed.choices?.[0]?.delta?.content;
          const finish = parsed.choices?.[0]?.finish_reason;

          if (delta) {
            onChunk(delta); // send actual text to component
          }

          if (finish === 'stop') {
            // Stop reading further
            return;
          }

        } catch (err) {
          console.error('JSON parse error:', err);
        }
      }
    }
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamsummaryService {
  public baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  async streamFile(file: File, onChunk: (chunk: string) => void): Promise<void> {
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

      const text = decoder.decode(value, { stream: true });  //Converts the raw chunk into a string.
      const lines = text.split('\n').filter(line => line.trim() !== '');

      for (let line of lines) {
        if (line.startsWith("data:")) {
          line = line.replace("data:", "").trim();
        }
        try {
          const parsed = JSON.parse(line);//Turns the line into a JavaScript object.

          // only take the text
          if (parsed.response) {
            onChunk(parsed.response);
          }

          if (parsed.done === true) {
            return; // stop when finished
          }
        } catch (err) {
          console.error("Parse error:", err, line);
        }
      }
    }

  }


}

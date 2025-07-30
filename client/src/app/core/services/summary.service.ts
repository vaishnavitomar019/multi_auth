import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  public baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  summarizePdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl, formData);
  }
}
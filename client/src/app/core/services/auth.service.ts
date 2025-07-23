import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}

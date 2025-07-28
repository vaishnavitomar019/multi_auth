import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}/google`;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem('token');
    
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProfile() {
    const token = this.getToken();
    return this.http.get(`${this.baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

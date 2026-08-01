import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = 'http://localhost:5203/api/Auth/login';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.url, user);
  }

  saveToken(token: string): void {
    console.log('Saving token:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    console.log('Getting token from localStorage');
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

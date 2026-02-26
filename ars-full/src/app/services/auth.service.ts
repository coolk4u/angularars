// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'ars_token';
  private readonly USER_KEY  = 'ars_user';
  private apiUrl = environment.apiUrl;

  currentUser = signal<User | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest): Observable<AuthResponse> {
    // PRODUCTION: return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, req).pipe(tap(r => this.saveSession(r, req.rememberMe)));
    // Mock for dev:
    if (req.dealerId === '123' && req.password === 'password') {
      const mock: AuthResponse = { token: 'mock-jwt', dealerId: req.dealerId, dealerName: 'AJ Traders', expiresIn: 3600 };
      return of(mock).pipe(tap(r => this.saveSession(r, req.rememberMe)));
    }
    return throwError(() => ({ status: 401, message: 'Incorrect Username or Password.' }));
  }

  forgotPassword(dealerId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/forgot-password`, { dealerId });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/reset-password`, { token, newPassword });
  }

  logout(): void {
    [localStorage, sessionStorage].forEach(s => { s.removeItem(this.TOKEN_KEY); s.removeItem(this.USER_KEY); });
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY));
  }

  private saveSession(resp: AuthResponse, remember: boolean): void {
    const user: User = { dealerId: resp.dealerId, dealerName: resp.dealerName, email: '', token: resp.token };
    const s = remember ? localStorage : sessionStorage;
    s.setItem(this.TOKEN_KEY, resp.token);
    s.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}

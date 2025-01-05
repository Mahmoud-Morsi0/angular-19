import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(ApiService);

  private tokenSignal = signal<string>(localStorage.getItem('authToken') || '');

  public token = this.tokenSignal.asReadonly();

  constructor() {
    this.fetchToken();
  }

  private fetchToken() {
    this.http.get('users/profile').subscribe((res: any) => {
      this.setToken(res.token);
    });
  }

  setToken(token: string) {
    this.tokenSignal.set(token);
    localStorage.setItem('authToken', token);
  }

  getTokenValue(): string {
    return this.tokenSignal();
  }

  removeToken() {
    this.tokenSignal.set('');
    localStorage.removeItem('authToken');
  }
}

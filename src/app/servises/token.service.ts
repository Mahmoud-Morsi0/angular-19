import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(ApiService);
  private tokenSignal = signal<string>('');
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
  }

  getTokenValue(): string {
    return this.tokenSignal();
  }

  removeToken() {
    this.tokenSignal.set('');
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

export type UserRole = 'admin' | 'employee' | 'manager';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roleSignal = signal<{ role: UserRole | null }>({ role: null });
  public role = this.roleSignal.asReadonly();

  constructor(private http: HttpClient) { }

  /**
   * Fetch the user role from the API.
   * @returns Observable of the user role.
   */
  getCurrentUserRole(): Observable<any> {
    return this.http.get<UserRole>('/api/user/role').pipe(
      tap((role) => {
        this.setUserRole(role);
      }),
      catchError((error) => {
        console.error('Failed to fetch user role:', error);
        this.clearUserRole();
        return throwError(() => error);
      })
    );
  }

  /**
   * Set the user role.
   * @param role The user role to set.
   */
  setUserRole(role: UserRole): void {
    this.roleSignal.set({ role });
  }

  /**
   * Clear the user role.
   */
  clearUserRole(): void {
    this.roleSignal.set({ role: null });
  }
}

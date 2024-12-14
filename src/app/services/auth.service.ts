import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

interface User {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // Use the environment variable
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _user = new BehaviorSubject<User | null>(null);

  readonly isAuthenticated$ = this._isAuthenticated.asObservable();
  readonly user$ = this._user.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isAuthenticated.next(true);
      this.loadUserData();
    }
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{token: string, user: User}>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this._isAuthenticated.next(true);
            if (response.user) {
              this._user.next(response.user);
            }
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.next(false);
    this._user.next(null);
  }

  private loadUserData(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<User>(`${this.apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (user) => this._user.next(user),
      error: () => this.logout()
    });
  }
}
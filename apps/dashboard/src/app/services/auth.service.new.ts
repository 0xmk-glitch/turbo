import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  User,
  UserRole,
  LoginRequest,
  LoginResponse,
  AuthError,
} from '@turbo-task-master/api-interfaces';
import { JwtUtils } from '@turbo-task-master/auth-shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Login user with credentials
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          this.saveAuthData(response);
          return response;
        }),
        catchError((error) => throwError(() => this.handleError(error))),
      );
  }

  /**
   * Logout user
   */
  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        map(() => {
          this.clearAuthData();
        }),
        catchError((error) => {
          // Even if logout fails on server, clear local data
          this.clearAuthData();
          return throwError(() => this.handleError(error));
        }),
      );
  }

  /**
   * Refresh JWT token
   */
  refreshToken(): Observable<string> {
    return this.http
      .post<{
        token: string;
      }>(`${this.baseUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        map((response) => {
          localStorage.setItem('authToken', response.token);
          return response.token;
        }),
        catchError((error) => {
          this.clearAuthData();
          return throwError(() => this.handleError(error));
        }),
      );
  }

  /**
   * Check if user is authenticated and token is valid
   */
  checkAuth(): Observable<{ user: User; token: string } | null> {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      return of(null);
    }

    // Validate token using JWT utils
    if (!JwtUtils.isTokenValid(token)) {
      this.clearAuthData();
      return of(null);
    }

    try {
      const user = JSON.parse(userStr);
      return of({ user, token });
    } catch {
      this.clearAuthData();
      return of(null);
    }
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get current token from storage
   */
  getCurrentToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Check if token needs refresh
   */
  needsTokenRefresh(): boolean {
    const token = this.getCurrentToken();
    if (!token) {
      return false;
    }

    return JwtUtils.needsRefresh(token, 5); // Refresh if expires within 5 minutes
  }

  /**
   * Save authentication data to localStorage
   */
  private saveAuthData(response: LoginResponse): void {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  }

  /**
   * Clear authentication data from localStorage
   */
  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Handle HTTP errors and convert to AuthError
   */
  private handleError(error: any): AuthError {
    if (error.error && error.error.message) {
      return {
        code: error.error.code || 'UNKNOWN_ERROR',
        message: error.error.message,
        details: error.error.details,
      };
    }

    if (error.status === 401) {
      return {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      };
    }

    if (error.status === 403) {
      return {
        code: 'FORBIDDEN',
        message: 'Access denied',
      };
    }

    if (error.status === 0) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection failed',
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
    };
  }
}

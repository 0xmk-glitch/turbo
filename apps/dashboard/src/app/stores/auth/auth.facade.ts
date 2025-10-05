import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User,
  LoginRequest,
  UserRole,
} from '@turbo-task-master/api-interfaces';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store = inject(Store);

  // Selectors
  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  user$ = this.store.select(AuthSelectors.selectUser);
  token$ = this.store.select(AuthSelectors.selectToken);
  error$ = this.store.select(AuthSelectors.selectError);
  userRole$ = this.store.select(AuthSelectors.selectUserRole);
  userId$ = this.store.select(AuthSelectors.selectUserId);
  userEmail$ = this.store.select(AuthSelectors.selectUserEmail);
  userName$ = this.store.select(AuthSelectors.selectUserName);
  lastLoginTime$ = this.store.select(AuthSelectors.selectLastLoginTime);

  // Role-based selectors (roles: admin, owner, viewer)
  isAdmin$ = this.store.select(AuthSelectors.selectIsAdmin);     // admin only
  isOwner$ = this.store.select(AuthSelectors.selectIsManager);   // owner or admin
  isViewer$ = this.store.select(AuthSelectors.selectUserRole).pipe(
    map((role) => role === 'viewer')
  );
  canManageUsers$ = this.store.select(AuthSelectors.selectCanManageUsers); // admin, owner
  canManageTasks$ = this.store.select(AuthSelectors.selectCanManageTasks); // admin, owner, viewer
  canViewTasks$ = this.store.select(AuthSelectors.selectCanViewTasks);

  // Actions
  login(credentials: LoginRequest): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  refreshToken(): void {
    this.store.dispatch(AuthActions.refreshToken());
  }

  checkAuth(): void {
    this.store.dispatch(AuthActions.checkAuth());
  }

  setAuthState(
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
  ): void {
    this.store.dispatch(
      AuthActions.setAuthState({ isAuthenticated, user, token }),
    );
  }

  clearError(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  setLoading(isLoading: boolean): void {
    this.store.dispatch(AuthActions.setLoading({ isLoading }));
  }

  // Helper methods
  hasRole(role: UserRole): Observable<boolean> {
    return this.store
      .select(AuthSelectors.selectUserRole)
      .pipe(map((userRole) => userRole === role));
  }

  hasAnyRole(roles: UserRole[]): Observable<boolean> {
    return this.store
      .select(AuthSelectors.selectUserRole)
      .pipe(
        map((userRole) => roles.includes(userRole || ('viewer' as UserRole))),
      );
  }
}

import { UserRole } from '../roles/user-role.enum';

export interface JwtPayload {
  sub: string; // user id
  username: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  iat: number; // issued at
  exp: number; // expiration
}

export class JwtUtils {
  /**
   * Decode JWT token without verification
   * @param token JWT token string
   * @returns Decoded payload or null if invalid
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      if (!token) {
        return null;
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  /**
   * Check if JWT token is expired
   * @param token JWT token string
   * @returns True if expired, false otherwise
   */
  static isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  /**
   * Check if JWT token is valid (not expired and has required fields)
   * @param token JWT token string
   * @returns True if valid, false otherwise
   */
  static isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }

    const payload = this.decodeToken(token);
    if (!payload) {
      return false;
    }

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      return false;
    }

    // Check required fields
    return !!(payload.sub && payload.username && payload.email && payload.role);
  }

  /**
   * Get token expiration time
   * @param token JWT token string
   * @returns Expiration time as Date or null if invalid
   */
  static getTokenExpiration(token: string): Date | null {
    const payload = this.decodeToken(token);
    if (!payload) {
      return null;
    }

    return new Date(payload.exp * 1000);
  }

  /**
   * Get time until token expires in seconds
   * @param token JWT token string
   * @returns Seconds until expiration or 0 if expired/invalid
   */
  static getTimeUntilExpiration(token: string): number {
    const payload = this.decodeToken(token);
    if (!payload) {
      return 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = payload.exp - currentTime;

    return Math.max(0, timeUntilExpiration);
  }

  /**
   * Check if token needs refresh (expires within specified minutes)
   * @param token JWT token string
   * @param refreshThresholdMinutes Minutes before expiration to consider refresh needed
   * @returns True if refresh needed, false otherwise
   */
  static needsRefresh(
    token: string,
    refreshThresholdMinutes: number = 5,
  ): boolean {
    const timeUntilExpiration = this.getTimeUntilExpiration(token);
    const refreshThresholdSeconds = refreshThresholdMinutes * 60;

    return (
      timeUntilExpiration > 0 && timeUntilExpiration <= refreshThresholdSeconds
    );
  }

  /**
   * Extract user role from token
   * @param token JWT token string
   * @returns User role or null if invalid
   */
  static getUserRole(token: string): UserRole | null {
    const payload = this.decodeToken(token);
    return payload?.role || null;
  }

  /**
   * Extract user ID from token
   * @param token JWT token string
   * @returns User ID or null if invalid
   */
  static getUserId(token: string): string | null {
    const payload = this.decodeToken(token);
    return payload?.sub || null;
  }

  /**
   * Extract organization ID from token
   * @param token JWT token string
   * @returns Organization ID or null if not present
   */
  static getOrganizationId(token: string): string | null {
    const payload = this.decodeToken(token);
    return payload?.organizationId || null;
  }
}

import { UserRole } from '../roles/user-role.enum';
export interface JwtPayload {
    sub: string;
    username: string;
    email: string;
    role: UserRole;
    organizationId?: string;
    iat: number;
    exp: number;
}
export declare class JwtUtils {
    /**
     * Decode JWT token without verification
     * @param token JWT token string
     * @returns Decoded payload or null if invalid
     */
    static decodeToken(token: string): JwtPayload | null;
    /**
     * Check if JWT token is expired
     * @param token JWT token string
     * @returns True if expired, false otherwise
     */
    static isTokenExpired(token: string): boolean;
    /**
     * Check if JWT token is valid (not expired and has required fields)
     * @param token JWT token string
     * @returns True if valid, false otherwise
     */
    static isTokenValid(token: string): boolean;
    /**
     * Get token expiration time
     * @param token JWT token string
     * @returns Expiration time as Date or null if invalid
     */
    static getTokenExpiration(token: string): Date | null;
    /**
     * Get time until token expires in seconds
     * @param token JWT token string
     * @returns Seconds until expiration or 0 if expired/invalid
     */
    static getTimeUntilExpiration(token: string): number;
    /**
     * Check if token needs refresh (expires within specified minutes)
     * @param token JWT token string
     * @param refreshThresholdMinutes Minutes before expiration to consider refresh needed
     * @returns True if refresh needed, false otherwise
     */
    static needsRefresh(token: string, refreshThresholdMinutes?: number): boolean;
    /**
     * Extract user role from token
     * @param token JWT token string
     * @returns User role or null if invalid
     */
    static getUserRole(token: string): UserRole | null;
    /**
     * Extract user ID from token
     * @param token JWT token string
     * @returns User ID or null if invalid
     */
    static getUserId(token: string): string | null;
    /**
     * Extract organization ID from token
     * @param token JWT token string
     * @returns Organization ID or null if not present
     */
    static getOrganizationId(token: string): string | null;
}

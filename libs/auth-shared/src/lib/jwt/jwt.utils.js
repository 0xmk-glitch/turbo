export class JwtUtils {
    /**
     * Decode JWT token without verification
     * @param token JWT token string
     * @returns Decoded payload or null if invalid
     */
    static decodeToken(token) {
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
            return JSON.parse(decoded);
        }
        catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    }
    /**
     * Check if JWT token is expired
     * @param token JWT token string
     * @returns True if expired, false otherwise
     */
    static isTokenExpired(token) {
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
    static isTokenValid(token) {
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
    static getTokenExpiration(token) {
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
    static getTimeUntilExpiration(token) {
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
    static needsRefresh(token, refreshThresholdMinutes = 5) {
        const timeUntilExpiration = this.getTimeUntilExpiration(token);
        const refreshThresholdSeconds = refreshThresholdMinutes * 60;
        return (timeUntilExpiration > 0 && timeUntilExpiration <= refreshThresholdSeconds);
    }
    /**
     * Extract user role from token
     * @param token JWT token string
     * @returns User role or null if invalid
     */
    static getUserRole(token) {
        const payload = this.decodeToken(token);
        return (payload === null || payload === void 0 ? void 0 : payload.role) || null;
    }
    /**
     * Extract user ID from token
     * @param token JWT token string
     * @returns User ID or null if invalid
     */
    static getUserId(token) {
        const payload = this.decodeToken(token);
        return (payload === null || payload === void 0 ? void 0 : payload.sub) || null;
    }
    /**
     * Extract organization ID from token
     * @param token JWT token string
     * @returns Organization ID or null if not present
     */
    static getOrganizationId(token) {
        const payload = this.decodeToken(token);
        return (payload === null || payload === void 0 ? void 0 : payload.organizationId) || null;
    }
}
//# sourceMappingURL=jwt.utils.js.map
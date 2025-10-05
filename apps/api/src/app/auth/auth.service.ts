import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from '../../../../../libs/auth/types/jwtPayload';
import { UserRole } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('Validating user with username:', username);

    const user = await this.userService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Load user with organization
    const userWithOrg = await this.userService.findOne(user.id);
    console.log('User found:', userWithOrg);
    return userWithOrg;
  }

  async register(
    email: string,
    password: string,
    name: string,
    organizationId: string,
  ) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name,
      organizationId,
      role: UserRole.VIEWER, // Default role is ADMIN
    });

    return this.login(user);
  }

  // user object is passed to the login method
  login(user: any) {
    const payload: AuthJwtPayload = {
      userId: user.id,
      email: user.email,
      orgId: user.organizationId,
      role: user.role || UserRole.ADMIN,
      username: user.name,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.generateRefreshToken();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.name?.split(' ')[0] || user.name,
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        username: user.email,
        role: user.role || UserRole.ADMIN,
        organizationId: user.organizationId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      expiresIn: 3600, // 1 hour in seconds
    };
  }

  async refreshToken(refreshToken: string) {
    // In a real implementation, you would validate the refresh token
    // and get the user from the database
    // For now, we'll generate a new access token

    // TODO: Implement proper refresh token validation
    // const user = await this.validateRefreshToken(refreshToken);

    // For demo purposes, generate a new token
    const newAccessToken = this.jwtService.sign({}, { expiresIn: '1h' });
    const newRefreshToken = this.generateRefreshToken();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
}

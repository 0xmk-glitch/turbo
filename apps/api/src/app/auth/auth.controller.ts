import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { OrganizationsService } from '../organizations/organizations.service';

export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto {
  email: string;
  password: string;
  name: string;
  organizationId: string;
}

export class RegisterWithOrgDto {
  email: string;
  password: string;
  name: string;
  organizationName: string;
  organizationDescription?: string;
  parentId?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('Login request with email:', loginDto.email);

    // validates user based on email and password
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    //returns user object and token as payload
    const result = await this.authService.login(user);

    // Set refresh token as httpOnly cookie
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      user: result.user,
      token: result.accessToken,
      expiresIn: result.expiresIn,
    };
  }

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    console.log('Register request for email:', registerDto.email);

    return await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.name,
      registerDto.organizationId,
    );
  }

  @Post('register-with-org')
  async registerWithOrganization(
    @Body(ValidationPipe) registerDto: RegisterWithOrgDto,
  ) {
    console.log(
      'Register with organization request for email:',
      registerDto.email,
    );

    // Create organization first
    const organization = await this.organizationsService.create({
      name: registerDto.organizationName,
      description: registerDto.organizationDescription,
      parentId: registerDto.parentId,
    });

    // Register user with the new organization
    return await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.name,
      organization.id,
    );
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the httpOnly refresh token cookie
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token provided');
    }

    const result = await this.authService.refreshToken(refreshToken);

    // Set new refresh token cookie
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { token: result.accessToken };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: Prisma.UserCreateInput): Promise<any> {
        const { email, password } = createUserDto;
        return await this.authService.register(email, password);
    }

    @Post('login')
    async login(@Body() createUserDto: Prisma.UserCreateInput): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, password } = createUserDto;
        return await this.authService.login(email, password);
    }

    @Post('verify-otp')
    async verifyOTP(@Body() verifyUserDto: Prisma.UserCreateInput): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, OTP } = verifyUserDto;
        return await this.authService.verifyOTP(email, OTP);
    }

    @Post('resend-otp')
    async resendOTP(@Body() resendUserDto: Prisma.UserCreateInput): Promise<any> {
        const { email } = resendUserDto;
        return await this.authService.resendOTP(email);
    }
}

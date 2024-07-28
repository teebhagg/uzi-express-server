import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from 'src/utils/email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ) {}

    private generateOTP(): string {
        const otpLength = 6;
        const digits = '0123456789';
        let otp = '';
      
        for (let i = 0; i < otpLength; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length);
          otp += digits[randomIndex];
        }
      
        return otp;
    }

    // Register a new user
    async register(email: string, password: string): Promise<any> {
        const otp = this.generateOTP();
        const otpExpiry = new Date(Date.now() + 3600000);
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        await this.usersService.create({ email, password: hashedPassword, OTP: otp, OTPExpiry: otpExpiry });
        await this.emailService.sendEmail(email, 'Verify Email', `Your OTP is: ${otp}. OTP is valid for 1 hour`);
        return { message: 'Registration successful. Please check your email for the OTP' };
    }

    // Login a user
    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid password');
        }
        const accessToken = this.jwtService.sign({ email: user.email, id: user.id }, { expiresIn: '3d' });
        const refreshToken = this.jwtService.sign({ email: user.email }, { expiresIn: '60d' });
        return { accessToken, refreshToken };
    }

    // Verify OTP
    async verifyOTP(email: string, OTP: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (new Date() > new Date(user.OTPExpiry) || !user.OTP) {
            throw new Error('OTP has expired. Please register again');
        }
        if (user.OTP !== OTP.toString()) {
            throw new Error('Invalid OTP');
        }
        await this.usersService.update(user.id, { OTP: null, isEmailVerified: true });
        const accessToken = this.jwtService.sign({ email: user.email, id: user.id }, { expiresIn: '3d' });
        const refreshToken = this.jwtService.sign({ email: user.email }, { expiresIn: '60d' });
        return { accessToken, refreshToken };
    }

    // Resent OTP
    async resendOTP(email: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const otp = this.generateOTP();
        await this.usersService.update(user.id, { OTP: otp });
        await this.emailService.sendEmail(email, 'Verify Email', `Your OTP is: ${otp}. OTP is valid for 1 hour`);
        return { message: 'OTP resent successfully. Please check your email for the new OTP' };
    }

    // Refresh token
    async refreshToken(token: string): Promise<{ token: string }> {
        const user = await this.jwtService.verify(token);
        const newToken = this.jwtService.sign({ email: user.email, id: user.id }, { expiresIn: '3d' });
        const newRefreshToken = this.jwtService.sign({ email: user.email }, { expiresIn: '60d' });
        return { token: newToken };
    }
}

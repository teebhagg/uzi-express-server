import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { EmailService } from 'src/utils/email/email.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, EmailService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}

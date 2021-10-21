import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-auth/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local-strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh/jwt-refresh-token.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

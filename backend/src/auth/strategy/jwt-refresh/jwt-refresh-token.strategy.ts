import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

import { Request } from 'express';
import { UsersService } from '../../../users/users.service';
import { configService } from '../../../config/config.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          Logger.log('REFRESH', request?.cookies?.Refresh);
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.getValue('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies?.Refresh;
    Logger.log('REFRESH TOKEN', refreshToken);
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
  }
}

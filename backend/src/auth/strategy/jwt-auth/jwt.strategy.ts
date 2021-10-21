import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { configService } from '../../../config/config.service';
import { UsersService } from '../../../users/users.service';

export interface JwtPayload {
  username: string;
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
      secretOrKey: `${configService.getValue('JWT_ACCESS_TOKEN_SECRET')}`,
    });
  }

  async validate(payload: any) {
    Logger.log('PAYLOAD', payload);
    return this.userService.getById(payload.userId);
  }
}

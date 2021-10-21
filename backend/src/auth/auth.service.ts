import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { UsersService } from '../users/users.service';
import { configService } from '../config/config.service';
import { UsersDTO } from '../users/dto/users.dto';

interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  public async register(user: any) {
    let isOk = false;

    const userDTO = new UsersDTO();
    userDTO.name = user.name;
    userDTO.email = user.email;
    userDTO.password = bcrypt.hashSync(user.password, 10);

    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userService.createUser(userDTO).catch((error) => {
        console.log(error);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: `User created with success` } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }

  async login(user: any): Promise<Record<string, any>> {
    let isOk = false;
    const userDTO = new UsersDTO();
    userDTO.name = user.name;
    userDTO.email = user.email;
    userDTO.password = user.password;


    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      const userDetails = await this.userService.getByEmail(user.email);
      if (userDetails === null) {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
      const isValid = bcrypt.compareSync(user.password, userDetails.password);
      if (isValid) {
        return userDetails;
      } else {
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { msg: 'Invalid fields.' } };
    }
  }

  public getCookieWithJwtAccessToken(userId: string) {
    Logger.log(userId);
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: configService.getValue('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${configService.getValue(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${configService.getValue(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookiesWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: configService.getValue('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${configService.getValue(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${configService.getValue(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return { cookie, token };
  }

  public getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Users } from '../model/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategy/jwt-auth/jwt-auth.guard';
import { LocalAuthenticationGuard } from './strategy/local-strategy/localAuthentication.guard';
import { Response, Request, request } from 'express';
import { JwtStrategy } from './strategy/jwt-auth/jwt.strategy';
import { UsersService } from '../users/users.service';
import JwtRefreshGuard from './strategy/jwt-refresh/jwt-refresh-token.guard';

interface RequestWithUser extends Request {
  user: Users;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { token: refreshToken, cookie: refreshTokenCookie } =
      this.authService.getCookiesWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    user.password = undefined;
    return res.send(user);
  }

  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    await this.userService.removeRefreshToken(req.user.id);
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );
    request.res.setHeader('Set-cookie', accessTokenCookie);
    const { password, currentHashedRefreshToken, ...result } = request.user;
    return result;
  }
}

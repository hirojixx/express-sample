import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { Response } from 'express';
import { Controller, Req, Body, Post, HttpCode, Res } from 'routing-controllers';

import { CreateUser } from '@/viewmodels/users.viewmodel';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() userData: CreateUser) {
    const signUpUserData: User = await this.authService.signup(userData);
    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  async logIn(@Res() res: Response, @Body() userData: CreateUser) {
    const { cookie, findUser } = await this.authService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    return { data: findUser, message: 'login' };
  }

  @Post('/logout')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData: User = req.user;
    const logOutUserData: User = await this.authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return { data: logOutUserData, message: 'logout' };
  }
}

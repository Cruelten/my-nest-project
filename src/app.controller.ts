import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "./signin/jwt.auth.guard";
import { MyValidationPipe } from './app.validation.pipe';
import {AuthService} from "./signin/signin.service";
// import {DailyGuard} from "./daily.guard";

// @UseGuards(DailyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    if (Math.random() > 0.75) {
      throw new Error('something wrong');
    }
    return this.appService.getHello();
  }

  @Get("/pipe/:mynumber")
  getMyNumber(@Param('mynumber', MyValidationPipe) mynumber: string): string {
    return mynumber;
  }


  @Get('/token')
  getToken(): string {
    return this.authService.createToken({ id: 2 });
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(JwtAuthGuard)
  @Post("/api/users/signin")
  async login(@Request() req) {
    return req.user;
  }
}

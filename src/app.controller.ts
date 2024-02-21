import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MyValidationPipe } from './app.validation.pipe';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

}

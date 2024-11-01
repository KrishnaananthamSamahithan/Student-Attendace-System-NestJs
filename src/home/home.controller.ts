import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  getHome() {
    return { message: 'Welcome to the Home Page' };
  }
}
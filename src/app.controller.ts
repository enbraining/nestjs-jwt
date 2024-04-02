import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    return this.appService.signIn(signInDto);
  }

  @Get()
  isUser(@Headers('Authorization') token: string): Promise<any> {
    return this.appService.isUser(token);
  }
}

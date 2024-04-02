import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    if (
      signInDto.email !== 'test@test.com' ||
      signInDto.password !== 'where1234'
    )
      throw new BadRequestException();

    const payload = {
      sub: 1,
      username: 'test',
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isUser(token: string): Promise<any> {
    if (token === undefined) throw new NotFoundException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'ssa97fasd0f9sdyafhsfad7f8as98fdfasaas',
      });
      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      }
    }
  }
}

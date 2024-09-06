import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hashPassword } from '../utils/password-hash';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOne(signInDto.username);
    if (user.password !== (await hashPassword(signInDto.password, user.salt))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

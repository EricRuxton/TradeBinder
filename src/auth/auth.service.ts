import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hashPassword } from '../utils/password-hash';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  static singleton: AuthService;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    if (!AuthService.singleton) AuthService.singleton = this;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findProfile(signInDto.username);
    if (user.password !== (await hashPassword(signInDto.password, user.salt))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      let unwrappedToken;
      if (token.split(' ').length > 1) {
        unwrappedToken = token.split(' ')[1];
      } else {
        unwrappedToken = token;
      }
      const parsed = this.jwtService.verify(unwrappedToken);
      const user = await this.userService.findOne(parsed.sub);
      if (!user)
        throw new NotFoundException('Could not get user from this token');

      if (user.verified && !user.locked) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}

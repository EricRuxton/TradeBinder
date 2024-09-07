import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { hashPassword } from '../utils/password-hash';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { TradebinderService } from '../tradebinder/tradebinder.service';
import { CollectionService } from '../collection/collection.service';

@Injectable()
export class AuthService {
  static singleton: AuthService;

  constructor(
    private userService: UserService,
    private tradebinderService: TradebinderService,
    private collectionService: CollectionService,
    private jwtService: JwtService,
  ) {
    if (!AuthService.singleton) AuthService.singleton = this;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findSensitiveUser(signInDto.username);
    if (
      !user.verified ||
      user.locked ||
      user.password !== (await hashPassword(signInDto.password, user.salt))
    ) {
      throw new UnauthorizedException();
    }
    return await this.signJwt(user);
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
      const user = await this.userService.findOne(parsed.username);
      if (!user)
        throw new NotFoundException('Could not get user from this token');

      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async verify(id: number, token: string) {
    const user = await this.userService.findOneById(id);
    if (!user || user.token !== token) {
      throw new BadRequestException('Bad Token');
    }
    if (!user.verified) {
      const collection = await this.collectionService.create({ user });
      const tradebinder = await this.tradebinderService.create({ user });
      await this.userService.update(user.id, {
        verified: true,
        collection,
        tradebinder,
      });
    }

    return this.signJwt(user);
  }

  private async signJwt(user: User) {
    const payload = {
      sub: user.id,
      userId: user.id,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

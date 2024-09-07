import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { verifyUserDto } from '../user/dto/verify-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('verify/:id')
  async verify(@Param('id') id, @Body() verifyDto: verifyUserDto) {
    return this.authService.verify(id, verifyDto.token);
  }
}

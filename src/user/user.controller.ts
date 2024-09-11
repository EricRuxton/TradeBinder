import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserInject } from './userInject';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //returns the signed-in users profile information
  @UseGuards(AuthGuard)
  @Get('profile')
  findOne(@UserInject() user: User) {
    return user;
  }

  //creates new user object, initiates signup email flow
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

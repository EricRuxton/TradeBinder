import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  //Gets the signed-in users collections
  @UseGuards(AuthGuard)
  @Get()
  find(@UserInject() user: User) {
    return this.collectionService.find(+user.id);
  }

  //gets the collection belonging to the username param, if it is public
  @UseGuards(AuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.collectionService.findOne(username);
  }
}

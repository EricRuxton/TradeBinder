import {
  Controller,
  Get,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  //Gets the signed-in users collection info
  @UseGuards(AuthGuard)
  @Get('/info')
  async myCollection(@UserInject() user: User) {
    const collection = await this.collectionService.findByUsername(
      user.username,
    );
    return this.collectionService.findInfo(collection);
  }

  //Gets the passed users collection info if it is public
  @Get('/info/:username')
  async find(@Param('username') username: string) {
    const collection = await this.collectionService.findByUsername(username);
    if (!collection.public)
      throw new UnauthorizedException('This collection is private');
    return this.collectionService.findInfo(collection);
  }
}

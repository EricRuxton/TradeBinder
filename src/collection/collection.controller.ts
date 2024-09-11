import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';
import { CardFilterDto } from '../collection_card/dto/filter-collection_card.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  //Gets the signed-in users collections
  @UseGuards(AuthGuard)
  @Get()
  find(@UserInject() user: User, @Query() cardFilter: CardFilterDto) {
    return this.collectionService.findInfo(user.username, cardFilter);
  }

  //Gets the passed collection's collection info
  @Get('/info/:username')
  async findInfo(
    @Param('username') username: string,
    @Query() cardFilter: CardFilterDto,
  ) {
    const collection = await this.collectionService.findOne(username);
    if (!collection) throw new BadRequestException('No collection found');
    if (!collection.public)
      throw new UnauthorizedException('This is a private collection');
    return this.collectionService.findInfo(
      collection.user.username,
      cardFilter,
    );
  }
}

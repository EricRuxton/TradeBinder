import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CreateCollection_cardDto } from './dto/create-collection_card.dto';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { CardFilterDto } from './dto/filter-collection_card.dto';
import { CollectionService } from '../collection/collection.service';
import { TradebinderService } from '../tradebinder/tradebinder.service';

@Controller('collection_card')
export class CollectionCardController {
  constructor(
    private readonly collectionCardService: CollectionCardService,
    private readonly collectionService: CollectionService,
    private readonly tradebinderService: TradebinderService,
  ) {}

  //adds a card to a users collection by its scryfallId
  //if a card does not already exist within the db with that id
  //scrape scryfall for that card
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createCollectionCards: CreateCollection_cardDto[],
    @UserInject() user: User,
  ) {
    return this.collectionCardService.create(createCollectionCards, user);
  }

  //gets all cards in the signed-in users collection, filtered
  @UseGuards(AuthGuard)
  @Get('collection')
  getAuthCollection(
    @UserInject() user: User,
    @Query() cardFilterDto: CardFilterDto,
  ) {
    return this.collectionCardService.findFiltered(user.collection.id, {
      ...cardFilterDto,
      take: cardFilterDto.take
        ? +cardFilterDto.take > 100
          ? 100
          : +cardFilterDto.take
        : 25,
      page: cardFilterDto.page ?? 1,
    });
  }

  //gets all cards in the passed users collection if it is public, filtered
  @Get('collection/:username')
  async getCollection(
    @Param('username') username: string,
    @Query() cardFilterDto: CardFilterDto,
  ) {
    const collection = await this.collectionService.findByUsername(username);
    if (!collection.public)
      throw new UnauthorizedException('Collection is private.');
    return this.collectionCardService.findFiltered(collection.id, {
      ...cardFilterDto,
      take: cardFilterDto.take
        ? +cardFilterDto.take > 100
          ? 100
          : +cardFilterDto.take
        : 25,
      page: cardFilterDto.page ?? 1,
    });
  }

  //gets all cards in the signed-in users tradebinder, filtered
  @UseGuards(AuthGuard)
  @Get('tradebinder/:username')
  async getAuthTradebinder(
    @UserInject() user: User,
    @Query() cardFilterDto: CardFilterDto,
  ) {
    return this.collectionCardService.findFiltered(user.collection.id, {
      ...cardFilterDto,
      value: user.tradebinder.threshold,
      tradeable: true,
      take: cardFilterDto.take
        ? +cardFilterDto.take > 100
          ? 100
          : +cardFilterDto.take
        : 25,
      page: cardFilterDto.page ?? 1,
    });
  }

  //gets all cards in the passed users tradebinder if it is public, filtered
  @Get('tradebinder/:username')
  async getTradebinder(
    @Param('username') username: string,
    @Query() cardFilterDto: CardFilterDto,
  ) {
    const tradebinder = await this.tradebinderService.findByUsername(username);
    const collection = await this.collectionService.findByUsername(username);

    if (!tradebinder.public)
      throw new UnauthorizedException('This tradebinder is private.');

    return this.collectionCardService.findFiltered(collection.id, {
      ...cardFilterDto,
      value: tradebinder.threshold,
      tradeable: true,
      take: cardFilterDto.take
        ? +cardFilterDto.take > 100
          ? 100
          : +cardFilterDto.take
        : 25,
      page: cardFilterDto.page ?? 1,
    });
  }

  //removes a card from the signed-in users collection
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@UserInject() user: User, @Param('id') id: string) {
    return this.collectionCardService.remove(+id, user.id);
  }
}

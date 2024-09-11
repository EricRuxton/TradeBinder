import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CreateCollection_cardDto } from './dto/create-collection_card.dto';
import { UpdateCollection_cardDto } from './dto/update-collection_card.dto';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('collection_card')
export class CollectionCardController {
  constructor(private readonly collectionCardService: CollectionCardService) {}

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionCardDto: UpdateCollection_cardDto,
  ) {
    return this.collectionCardService.update(+id, updateCollectionCardDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@UserInject() user: User, @Param('id') id: string) {
    return this.collectionCardService.remove(+id, user.id);
  }
}

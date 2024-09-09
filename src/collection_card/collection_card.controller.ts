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
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';
import { UserDecorator } from '../user/user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('collection_card')
export class CollectionCardController {
  constructor(private readonly collectionCardService: CollectionCardService) {}

  //adds a card to a users collection by its scryfallId
  //if a card does not already exist within the db with that id
  //scrap scryfall for that card
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createCollectionCards: CreateCollectionCardDto[],
    @UserDecorator() user: User,
  ) {
    return this.collectionCardService.create(createCollectionCards, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionCardDto: UpdateCollectionCardDto,
  ) {
    return this.collectionCardService.update(+id, updateCollectionCardDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@UserDecorator() user: User, @Param('id') id: string) {
    return this.collectionCardService.remove(+id, user.id);
  }
}

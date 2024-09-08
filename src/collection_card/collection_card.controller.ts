import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';
import { UserDecorator } from '../user/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('collection_card')
export class CollectionCardController {
  constructor(private readonly collectionCardService: CollectionCardService) {}

  @Post()
  create(
    @Body() createCollectionCardDto: CreateCollectionCardDto,
    @UserDecorator() user: User,
  ) {
    return this.collectionCardService.create(createCollectionCardDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionCardDto: UpdateCollectionCardDto,
  ) {
    return this.collectionCardService.update(+id, updateCollectionCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionCardService.remove(+id);
  }
}

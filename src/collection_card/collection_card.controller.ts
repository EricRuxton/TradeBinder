import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';

@Controller('collection-card')
export class CollectionCardController {
  constructor(private readonly collectionCardService: CollectionCardService) {}

  @Post()
  create(@Body() createCollectionCardDto: CreateCollectionCardDto) {
    return this.collectionCardService.create(createCollectionCardDto);
  }

  @Get()
  findAll() {
    return this.collectionCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionCardService.findOne(+id);
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

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradebinderCollectionCardService } from './tradebinder_collection_card.service';
import { CreateTradebinderCollectionCardDto } from './dto/create-tradebinder_collection_card.dto';
import { UpdateTradebinderCollectionCardDto } from './dto/update-tradebinder_collection_card.dto';

@Controller('tradebinder-collection-card')
export class TradebinderCollectionCardController {
  constructor(private readonly tradebinderCollectionCardService: TradebinderCollectionCardService) {}

  @Post()
  create(@Body() createTradebinderCollectionCardDto: CreateTradebinderCollectionCardDto) {
    return this.tradebinderCollectionCardService.create(createTradebinderCollectionCardDto);
  }

  @Get()
  findAll() {
    return this.tradebinderCollectionCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradebinderCollectionCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradebinderCollectionCardDto: UpdateTradebinderCollectionCardDto) {
    return this.tradebinderCollectionCardService.update(+id, updateTradebinderCollectionCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradebinderCollectionCardService.remove(+id);
  }
}

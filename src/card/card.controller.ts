import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { AuthGuard } from '../auth/auth.guard';
import { MtgoLineItemDto } from './dto/mtgo-line-item.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  //takes a list of mtg card names and returns all
  //scryfall objects with the same name
  @UseGuards(AuthGuard)
  @Post('batch')
  batchImport(@Body() mtgoLineItems: MtgoLineItemDto[]) {
    return this.cardService.parseBatch(mtgoLineItems);
  }

  //returns the card with the given scryfallId
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }
}

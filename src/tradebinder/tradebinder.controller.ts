import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradebinderService } from './tradebinder.service';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';

@Controller('tradebinder')
export class TradebinderController {
  constructor(private readonly tradebinderService: TradebinderService) {}

  @Post()
  create(@Body() createTradebinderDto: CreateTradebinderDto) {
    return this.tradebinderService.create(createTradebinderDto);
  }

  @Get()
  findAll() {
    return this.tradebinderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradebinderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradebinderDto: UpdateTradebinderDto,
  ) {
    return this.tradebinderService.update(+id, updateTradebinderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradebinderService.remove(+id);
  }
}

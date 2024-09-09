import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TradebinderService } from './tradebinder.service';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserInject } from '../user/userInject';
import { User } from '../user/entities/user.entity';

@Controller('tradebinder')
export class TradebinderController {
  constructor(private readonly tradebinderService: TradebinderService) {}

  @Post()
  create(@Body() createTradebinderDto: CreateTradebinderDto) {
    return this.tradebinderService.create(createTradebinderDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  find(@UserInject() user: User) {
    return this.tradebinderService.findOne(user.id);
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

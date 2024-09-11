import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
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

  //Gets the signed-in users collection info
  @UseGuards(AuthGuard)
  @Get('/info')
  async myTradebinder(@UserInject() user: User) {
    const tradebinder = await this.tradebinderService.findByUsername(
      user.username,
    );
    return this.tradebinderService.findInfo(tradebinder);
  }

  //Gets the passed users collection info if it is public
  @Get('/info/:username')
  async find(@Param('username') username: string) {
    const tradebinder = await this.tradebinderService.findByUsername(username);
    if (!tradebinder.public)
      throw new UnauthorizedException('This collection is private');
    return this.tradebinderService.findInfo(tradebinder);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(
    @UserInject() user: User,
    @Body() updateTradebinderDto: UpdateTradebinderDto,
  ) {
    return this.tradebinderService.update(user.id, updateTradebinderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradebinderService.remove(+id);
  }
}

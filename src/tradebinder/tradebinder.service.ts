import { Injectable } from '@nestjs/common';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';

@Injectable()
export class TradebinderService {
  create(createTradebinderDto: CreateTradebinderDto) {
    return 'This action adds a new tradebinder';
  }

  findAll() {
    return `This action returns all tradebinder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradebinder`;
  }

  update(id: number, updateTradebinderDto: UpdateTradebinderDto) {
    return `This action updates a #${id} tradebinder`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradebinder`;
  }
}

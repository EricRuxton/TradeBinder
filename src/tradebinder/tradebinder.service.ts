import { Injectable } from '@nestjs/common';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tradebinder } from './entities/tradebinder.entity';

@Injectable()
export class TradebinderService {
  constructor(
    @InjectRepository(Tradebinder)
    private tradebinderRepository: Repository<Tradebinder>,
  ) {}

  create(createTradebinderDto: CreateTradebinderDto) {
    return this.tradebinderRepository.save(createTradebinderDto);
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

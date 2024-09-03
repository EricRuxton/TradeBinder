import { Injectable } from '@nestjs/common';
import { CreateTradebinderCollectionCardDto } from './dto/create-tradebinder_collection_card.dto';
import { UpdateTradebinderCollectionCardDto } from './dto/update-tradebinder_collection_card.dto';

@Injectable()
export class TradebinderCollectionCardService {
  create(createTradebinderCollectionCardDto: CreateTradebinderCollectionCardDto) {
    return 'This action adds a new tradebinderCollectionCard';
  }

  findAll() {
    return `This action returns all tradebinderCollectionCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradebinderCollectionCard`;
  }

  update(id: number, updateTradebinderCollectionCardDto: UpdateTradebinderCollectionCardDto) {
    return `This action updates a #${id} tradebinderCollectionCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradebinderCollectionCard`;
  }
}

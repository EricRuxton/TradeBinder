import { Injectable } from '@nestjs/common';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tradebinder } from './entities/tradebinder.entity';
import { CollectionCardService } from '../collection_card/collection_card.service';

@Injectable()
export class TradebinderService {
  constructor(
    @InjectRepository(Tradebinder)
    private tradebinderRepository: Repository<Tradebinder>,
    private collectionCardService: CollectionCardService,
  ) {}

  create(createTradebinderDto: CreateTradebinderDto) {
    return this.tradebinderRepository.save(createTradebinderDto);
  }

  findAll() {
    return `This action returns all tradebinder`;
  }

  async findOne(id: number) {
    const tradebinder = await this.tradebinderRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: {
        user: {
          collection: true,
        },
      },
    });
    return await this.collectionCardService.findTradeBinderCards(
      tradebinder.user.collection.id,
      tradebinder.threshold,
    );
  }

  update(id: number, updateTradebinderDto: UpdateTradebinderDto) {
    return `This action updates a #${id} tradebinder`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradebinder`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTradebinderDto } from './dto/create-tradebinder.dto';
import { UpdateTradebinderDto } from './dto/update-tradebinder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tradebinder } from './entities/tradebinder.entity';
import { CollectionCardService } from '../collection_card/collection_card.service';
import { buildCardInfoResponse } from '../utils/utils';

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

  async findByUsername(username: string) {
    return this.tradebinderRepository.findOne({
      where: {
        user: {
          username,
        },
      },
      relations: {
        user: {
          collection: true,
        },
      },
    });
  }

  async update(id: number, updateTradebinderDto: UpdateTradebinderDto) {
    const tradebinder = await this.tradebinderRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        user: {
          id,
        },
      },
    });
    if (!tradebinder)
      throw new BadRequestException('Could not find tradebinder for user.');
    return this.tradebinderRepository.save({
      ...tradebinder,
      threshold: updateTradebinderDto.threshold,
    });
  }

  async findInfo(tradebinder: Tradebinder) {
    const collectionCards = await this.collectionCardService.findFiltered(
      tradebinder.user.collection.id,
    );
    return {
      tradebinder,
      ...buildCardInfoResponse(
        collectionCards.filter(
          (cc) => cc.value > tradebinder.threshold && cc.tradeable,
        ),
      ),
    };
  }
}

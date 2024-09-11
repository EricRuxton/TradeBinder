import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CardFilterDto } from '../collection_card/dto/filter-collection_card.dto';
import { CollectionCardService } from '../collection_card/collection_card.service';
import { buildCardInfoResponse } from '../utils/utils';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @Inject(forwardRef(() => CollectionCardService))
    private collectionCardService: CollectionCardService,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionRepository.save(createCollectionDto);
  }

  findOne(username: string) {
    return this.collectionRepository.findOne({
      relations: {
        user: true,
      },
      where: { user: { username } },
    });
  }

  async findDetails(username: string, cardFilter?: CardFilterDto) {
    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
        collectionCards: {
          card: true,
        },
      },
      where: {
        user: { username },
        //optional filter params
        //name
        ...(cardFilter?.name
          ? {
              collectionCards: {
                card: { name: ILike(`%${cardFilter.name}%`) },
              },
            }
          : undefined),
        //color
        ...(cardFilter?.color
          ? {
              collectionCards: {
                card: { color: ILike(`%${cardFilter.color}%`) },
              },
            }
          : undefined),
        //cmc
        ...(cardFilter?.cmc
          ? {
              collectionCards: {
                card: { cmc: cardFilter.cmc },
              },
            }
          : undefined),
      },
    });
    if (!collection) throw new BadRequestException('Collection not found');
    return collection;
  }

  async findInfo(username: string, cardFilterDto?: CardFilterDto) {
    const collection = await this.findOne(username);
    const collectionCards = await this.collectionCardService.findAll(
      collection.id,
      cardFilterDto,
    );
    return {
      ...buildCardInfoResponse(collectionCards),
      cards: collectionCards,
    };
  }
}

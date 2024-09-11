import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
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

  findByUsername(username: string) {
    return this.collectionRepository.findOne({
      where: { user: { username } },
      relations: { user: true },
    });
  }

  async findInfo(collection: Collection) {
    const collectionCards = await this.collectionCardService.findFiltered(
      collection.id,
    );
    return {
      collection,
      ...buildCardInfoResponse(collectionCards),
    };
  }
}

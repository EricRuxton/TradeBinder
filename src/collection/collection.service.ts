import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionRepository.save(createCollectionDto);
  }

  find(id: number) {
    return this.collectionRepository.findOne({
      relations: {
        user: true,
        collectionCards: {
          card: true,
        },
      },
      where: { user: { id } },
    });
  }

  async findOne(username: string) {
    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
        collectionCards: {
          card: true,
        },
      },
      where: {
        user: { username },
      },
    });
    if (!collection.public) {
      throw new UnauthorizedException('This collection is private');
    }
    return collection;
  }
}

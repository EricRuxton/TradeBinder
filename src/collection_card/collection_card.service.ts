import { Injectable } from '@nestjs/common';
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';

@Injectable()
export class CollectionCardService {
  create(createCollectionCardDto: CreateCollectionCardDto) {
    return 'This action adds a new collectionCard';
  }

  findAll() {
    return `This action returns all collectionCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionCard`;
  }

  update(id: number, updateCollectionCardDto: UpdateCollectionCardDto) {
    return `This action updates a #${id} collectionCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionCard`;
  }
}

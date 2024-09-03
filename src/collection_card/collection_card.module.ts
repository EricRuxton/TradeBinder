import { Module } from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CollectionCardController } from './collection_card.controller';

@Module({
  controllers: [CollectionCardController],
  providers: [CollectionCardService],
})
export class CollectionCardModule {}

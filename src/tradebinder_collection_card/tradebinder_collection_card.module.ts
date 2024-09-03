import { Module } from '@nestjs/common';
import { TradebinderCollectionCardService } from './tradebinder_collection_card.service';
import { TradebinderCollectionCardController } from './tradebinder_collection_card.controller';

@Module({
  controllers: [TradebinderCollectionCardController],
  providers: [TradebinderCollectionCardService],
})
export class TradebinderCollectionCardModule {}

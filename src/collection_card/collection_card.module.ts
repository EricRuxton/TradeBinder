import { forwardRef, Module } from '@nestjs/common';
import { CollectionCardService } from './collection_card.service';
import { CollectionCardController } from './collection_card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionCard } from './entities/collection_card.entity';
import { CardModule } from '../card/card.module';
import { CollectionModule } from '../collection/collection.module';
import { ScryfallModule } from '../scryfall/scryfall.module';

@Module({
  imports: [
    CardModule,
    forwardRef(() => CollectionModule),
    ScryfallModule,
    TypeOrmModule.forFeature([CollectionCard]),
  ],
  controllers: [CollectionCardController],
  providers: [CollectionCardService],
  exports: [CollectionCardService],
})
export class CollectionCardModule {}

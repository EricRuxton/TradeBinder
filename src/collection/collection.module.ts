import { forwardRef, Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionCardModule } from '../collection_card/collection_card.module';

@Module({
  imports: [
    forwardRef(() => CollectionCardModule),
    TypeOrmModule.forFeature([Collection]),
  ],
  exports: [CollectionService],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}

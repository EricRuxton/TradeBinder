import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionCardModule } from './collection_card/collection_card.module';
import { TradebinderModule } from './tradebinder/tradebinder.module';
import { TradebinderCollectionCardModule } from './tradebinder_collection_card/tradebinder_collection_card.module';

@Module({
  imports: [
    UserModule,
    CardModule,
    CollectionModule,
    CollectionCardModule,
    TradebinderModule,
    TradebinderCollectionCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

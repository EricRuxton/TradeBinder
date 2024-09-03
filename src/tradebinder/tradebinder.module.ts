import { Module } from '@nestjs/common';
import { TradebinderService } from './tradebinder.service';
import { TradebinderController } from './tradebinder.controller';

@Module({
  controllers: [TradebinderController],
  providers: [TradebinderService],
})
export class TradebinderModule {}

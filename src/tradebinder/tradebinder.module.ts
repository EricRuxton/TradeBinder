import { Module } from '@nestjs/common';
import { TradebinderService } from './tradebinder.service';
import { TradebinderController } from './tradebinder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tradebinder } from './entities/tradebinder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tradebinder])],
  exports: [TradebinderService],
  controllers: [TradebinderController],
  providers: [TradebinderService],
})
export class TradebinderModule {}

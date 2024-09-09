import { Module } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';

@Module({
  providers: [ScryfallService],
  exports: [ScryfallService],
})
export class ScryfallModule {}

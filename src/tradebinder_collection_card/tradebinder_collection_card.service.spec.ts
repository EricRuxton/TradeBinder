import { Test, TestingModule } from '@nestjs/testing';
import { TradebinderCollectionCardService } from './tradebinder_collection_card.service';

describe('TradebinderCollectionCardService', () => {
  let service: TradebinderCollectionCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradebinderCollectionCardService],
    }).compile();

    service = module.get<TradebinderCollectionCardService>(TradebinderCollectionCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

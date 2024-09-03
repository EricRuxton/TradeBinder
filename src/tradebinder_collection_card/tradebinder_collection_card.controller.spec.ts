import { Test, TestingModule } from '@nestjs/testing';
import { TradebinderCollectionCardController } from './tradebinder_collection_card.controller';
import { TradebinderCollectionCardService } from './tradebinder_collection_card.service';

describe('TradebinderCollectionCardController', () => {
  let controller: TradebinderCollectionCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradebinderCollectionCardController],
      providers: [TradebinderCollectionCardService],
    }).compile();

    controller = module.get<TradebinderCollectionCardController>(
      TradebinderCollectionCardController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

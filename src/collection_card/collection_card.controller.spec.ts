import { Test, TestingModule } from '@nestjs/testing';
import { CollectionCardController } from './collection_card.controller';
import { CollectionCardService } from './collection_card.service';

describe('CollectionCardController', () => {
  let controller: CollectionCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionCardController],
      providers: [CollectionCardService],
    }).compile();

    controller = module.get<CollectionCardController>(CollectionCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

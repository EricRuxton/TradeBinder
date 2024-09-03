import { Test, TestingModule } from '@nestjs/testing';
import { CollectionCardService } from './collection_card.service';

describe('CollectionCardService', () => {
  let service: CollectionCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionCardService],
    }).compile();

    service = module.get<CollectionCardService>(CollectionCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

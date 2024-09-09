import { Test, TestingModule } from '@nestjs/testing';
import { ScryfallService } from './scryfall.service';

describe('ScryfallService', () => {
  let service: ScryfallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScryfallService],
    }).compile();

    service = module.get<ScryfallService>(ScryfallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

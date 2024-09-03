import { Test, TestingModule } from '@nestjs/testing';
import { TradebinderService } from './tradebinder.service';

describe('TradebinderService', () => {
  let service: TradebinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradebinderService],
    }).compile();

    service = module.get<TradebinderService>(TradebinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

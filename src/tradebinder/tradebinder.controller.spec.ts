import { Test, TestingModule } from '@nestjs/testing';
import { TradebinderController } from './tradebinder.controller';
import { TradebinderService } from './tradebinder.service';

describe('TradebinderController', () => {
  let controller: TradebinderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradebinderController],
      providers: [TradebinderService],
    }).compile();

    controller = module.get<TradebinderController>(TradebinderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

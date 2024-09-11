import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ScryfallCardDto } from '../scryfall/dto/scryfall-card.dto';
import { MtgoLineItemDto } from './dto/mtgo-line-item.dto';
import { ScryfallService } from '../scryfall/scryfall.service';
import { delay } from '../utils/utils';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private readonly scryfallService: ScryfallService,
  ) {}

  async create(scryfallCardDto: ScryfallCardDto) {
    return this.cardRepository.save(
      await this.scryfallCardTransformer(scryfallCardDto),
    );
  }

  async scryfallCardTransformer(scryfallCardDto: ScryfallCardDto) {
    return new Card({
      colorIdentity: scryfallCardDto.color_identity.toString(),
      flatValue: scryfallCardDto.prices.usd,
      color: scryfallCardDto.colors.toString(),
      name: scryfallCardDto.name,
      cardType: scryfallCardDto.type_line,
      cmc: scryfallCardDto.cmc,
      scryfallId: scryfallCardDto.id,
      foilValue: scryfallCardDto.prices.usd_foil,
      cardUri: scryfallCardDto.image_uris.small,
      artUri: scryfallCardDto.image_uris.art_crop,
      setName: scryfallCardDto.set,
      finishes: scryfallCardDto.finishes.toString(),
      language: scryfallCardDto.lang,
      collectorNumber: scryfallCardDto.collector_number,
      rarity: scryfallCardDto.rarity,
      setCode: scryfallCardDto.set,
    } as unknown as Card);
  }

  async findAll() {}

  async findOne(scryfallId: string) {
    return await this.cardRepository.findOne({
      where: {
        scryfallId,
      },
    });
  }

  async parseBatch(mtgoLineItems: MtgoLineItemDto[]) {
    const res = [];
    for (const mtgLineItem of mtgoLineItems) {
      const scryfallResponse: ScryfallCardDto[] =
        await this.scryfallService.findAllByName(mtgLineItem.name);
      const tbCards: Card[] = [];
      for (const scryfallCard of scryfallResponse) {
        tbCards.push(await this.scryfallCardTransformer(scryfallCard));
      }
      res.push({
        qty: mtgLineItem.qty,
        [mtgLineItem.name]: tbCards.sort((a, b) => {
          return a.setName > b.setName ? 1 : -1;
        }),
      });
      //scryfall advises 50-100ms for rate limiting
      await delay(200);
      //scryfallCards.push(...scryfallResponse.data);
    }
    return res;
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
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
    return new Card(
      scryfallCardDto.set_name,
      scryfallCardDto.color_identity.toString(),
      scryfallCardDto.prices.usd,
      scryfallCardDto.colors.toString(),
      scryfallCardDto.name,
      scryfallCardDto.type_line,
      scryfallCardDto.cmc,
      scryfallCardDto.id,
      scryfallCardDto.prices.usd_foil,
      scryfallCardDto.image_uris.small,
      scryfallCardDto.image_uris.art_crop,
      scryfallCardDto.set,
      scryfallCardDto.finishes.toString(),
      scryfallCardDto.lang,
      scryfallCardDto.collector_number,
    );
  }

  async findAll() {}

  async findOne(scryfallId: string) {
    return await this.cardRepository.findOne({
      where: {
        scryfallId,
      },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
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

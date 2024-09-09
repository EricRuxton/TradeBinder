import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ScryfallCardDto } from './dto/scryfall-card.dto';
import { MtgoLineitemDto } from './dto/mtgo-lineitem.dto';
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

  async parseBatch(mtgoLineItems: MtgoLineitemDto[]) {
    const tbCards: Card[] = [];
    for (const mtgLineItem of mtgoLineItems) {
      const scryfallResponse: ScryfallCardDto[] =
        await this.scryfallService.findAllByName(mtgLineItem.name);
      for (const scryfallCard of scryfallResponse) {
        tbCards.push(await this.scryfallCardTransformer(scryfallCard));
      }
      //scryfall advises 50-100ms for rate limiting
      await delay(200);
      //scryfallCards.push(...scryfallResponse.data);
    }
    console.log(tbCards);
    return tbCards;
  }
}

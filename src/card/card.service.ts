import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ScryfallCardDto } from './dto/scryfall-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(scryfallCardDto: ScryfallCardDto) {
    console.log(scryfallCardDto);
    const card = new Card(
      scryfallCardDto.set_name,
      scryfallCardDto.color_identity.toString(),
      scryfallCardDto.prices.usd,
      scryfallCardDto.colors.toString(),
      scryfallCardDto.name,
      scryfallCardDto.type_line,
      scryfallCardDto.cmc,
      scryfallCardDto.id,
      scryfallCardDto.prices.usd_foil,
    );
    console.log(card);
    return this.cardRepository.save(card);
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
}

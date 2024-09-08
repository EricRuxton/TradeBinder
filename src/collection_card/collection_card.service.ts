import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';
import { CardService } from '../card/card.service';
import { Card } from '../card/entities/card.entity';
import axios from 'axios';
import { ScryfallCardDto } from '../card/dto/scryfall-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionCard } from './entities/collection_card.entity';
import { User } from '../user/entities/user.entity';
import { CollectionService } from '../collection/collection.service';

@Injectable()
export class CollectionCardService {
  constructor(
    private cardService: CardService,
    private collectionService: CollectionService,
    @InjectRepository(CollectionCard)
    private collectionCardRepository: Repository<CollectionCard>,
  ) {}

  async create(createCollectionCardDto: CreateCollectionCardDto, user: User) {
    const collection = await this.collectionService.find(user.id);
    //find card reference with scryfallId in cards
    let card: Card = await this.cardService.findOne(
      createCollectionCardDto.scryfallId,
    );
    //if one does not exist, fetch from scryfall and create card reference
    if (!card) {
      console.log('No card found internally, scraping scryfall');
      try {
        const scryfallCard: ScryfallCardDto = await this.getScryfallCard(
          createCollectionCardDto.scryfallId,
        );
        card = await this.cardService.create(scryfallCard);
      } catch (e) {
        console.log(e);
        throw new BadRequestException('Error retrieving card from scryfall');
      }
    }
    //create new collection_card from card reference
    const collectionCard = new CollectionCard(
      collection,
      card,
      createCollectionCardDto.foil,
    );
    return this.collectionCardRepository.save(collectionCard);
  }

  findAll() {
    //get all cards with a name ILIKE() the passed value
    //group the results by scryfallId
    //return unique results
    return `This action returns all collectionCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionCard`;
  }

  update(id: number, updateCollectionCardDto: UpdateCollectionCardDto) {
    return `This action updates a #${id} collectionCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionCard`;
  }

  async getScryfallCard(scryfallId: string): Promise<ScryfallCardDto> {
    const response = await axios.get(
      `https://api.scryfall.com/cards/${scryfallId}`,
    );
    return response.data;
  }
}

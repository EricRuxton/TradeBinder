import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCollectionCardDto } from './dto/create-collection_card.dto';
import { UpdateCollectionCardDto } from './dto/update-collection_card.dto';
import { CardService } from '../card/card.service';
import { Card } from '../card/entities/card.entity';
import { ScryfallCardDto } from '../card/dto/scryfall-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionCard } from './entities/collection_card.entity';
import { User } from '../user/entities/user.entity';
import { CollectionService } from '../collection/collection.service';
import 'dotenv/config';
import { delay } from '../utils/utils';
import { ScryfallService } from '../scryfall/scryfall.service';

@Injectable()
export class CollectionCardService {
  constructor(
    private cardService: CardService,
    private collectionService: CollectionService,
    private scryfallService: ScryfallService,
    @InjectRepository(CollectionCard)
    private collectionCardRepository: Repository<CollectionCard>,
  ) {}

  async create(createCollectionCards: CreateCollectionCardDto[], user: User) {
    const collection = await this.collectionService.find(user.id);
    for (const createCollectionCardDto of createCollectionCards) {
      //find card reference with scryfallId in cards
      let card: Card = await this.cardService.findOne(
        createCollectionCardDto.scryfallId,
      );
      //if one does not exist, fetch from scryfall and create card reference
      if (!card) {
        console.log('No card found internally, scraping scryfall');
        try {
          const scryfallCard: ScryfallCardDto =
            await this.scryfallService.findOneById(
              createCollectionCardDto.scryfallId,
            );
          card = await this.cardService.create(scryfallCard);
        } catch (e) {
          console.log(e);
          throw new BadRequestException('Error retrieving card from scryfall');
        }
        //delay necessary for scryfall rate limiting
        await delay(75);
      }
      //create new collection_card from card reference
      await this.collectionCardRepository.save(
        new CollectionCard(
          collection,
          card,
          createCollectionCardDto.foil,
          createCollectionCardDto.tradeable,
        ),
      );
    }
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

  async remove(id: number, userId: number) {
    const collectionCard = await this.collectionCardRepository.findOne({
      where: {
        id,
      },
      relations: {
        collection: {
          user: true,
        },
      },
    });
    if (!collectionCard)
      throw new BadRequestException(
        `No collection card with Id #${id} could be found`,
      );
    if (collectionCard.collection.user.id !== userId)
      throw new UnauthorizedException(
        'This card does not exist within your collection',
      );
    return await this.collectionCardRepository.delete(id);
  }
}

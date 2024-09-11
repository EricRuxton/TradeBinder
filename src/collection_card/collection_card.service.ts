import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCollection_cardDto } from './dto/create-collection_card.dto';
import { UpdateCollection_cardDto } from './dto/update-collection_card.dto';
import { CardService } from '../card/card.service';
import { Card } from '../card/entities/card.entity';
import { ScryfallCardDto } from '../scryfall/dto/scryfall-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CollectionCard } from './entities/collection_card.entity';
import { User } from '../user/entities/user.entity';
import { CollectionService } from '../collection/collection.service';
import 'dotenv/config';
import { delay } from '../utils/utils';
import { ScryfallService } from '../scryfall/scryfall.service';
import { CardFilterDto } from './dto/filter-collection_card.dto';
import { RawCollectionCardDto } from './dto/raw-collection_card.dto';

@Injectable()
export class CollectionCardService {
  constructor(
    private cardService: CardService,
    @Inject(forwardRef(() => CollectionService))
    private collectionService: CollectionService,
    private scryfallService: ScryfallService,
    @InjectRepository(CollectionCard)
    private collectionCardRepository: Repository<CollectionCard>,
  ) {}

  private static transformRawCollectionCards(
    rawCollectionCards: RawCollectionCardDto[],
  ): CollectionCard[] {
    return rawCollectionCards.map((rawCollectionCard) => {
      return {
        id: rawCollectionCard.collection_card_id,
        tradeable: rawCollectionCard.collection_card_tradeable,
        foil: rawCollectionCard.collection_card_foil,
        value: +rawCollectionCard.value,
        card: {
          id: rawCollectionCard.card_id,
          scryfallId: rawCollectionCard.card_scryfallId,
          name: rawCollectionCard.card_name,
          cardType: rawCollectionCard.card_cardType,
          setName: rawCollectionCard.card_setName,
          setCode: rawCollectionCard.card_setCode,
          flatValue: rawCollectionCard.card_flatValue,
          foilValue: rawCollectionCard.card_foilValue,
          color: rawCollectionCard.card_color,
          colorIdentity: rawCollectionCard.card_colorIdentity,
          cmc: rawCollectionCard.card_cmc,
          rarity: rawCollectionCard.card_rarity,
          cardUri: rawCollectionCard.card_cardUri,
          artUri: rawCollectionCard.card_artUri,
          finishes: rawCollectionCard.card_finishes,
          language: rawCollectionCard.card_language,
          collectorNumber: rawCollectionCard.card_collectorNumber,
        } as unknown as Card,
      };
    }) as unknown as CollectionCard[];
  }

  async create(createCollectionCards: CreateCollection_cardDto[], user: User) {
    const collection = await this.collectionService.findOne(user.username);
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
        new CollectionCard({
          collection,
          card,
          foil: createCollectionCardDto.foil,
          tradeable: createCollectionCardDto.tradeable,
        }),
      );
    }
  }

  async findAll(collectionId, cardFilterDto: CardFilterDto) {
    const rawCollectionCards: RawCollectionCardDto[] =
      await this.collectionCardRepository
        .createQueryBuilder('collection_card')
        .leftJoinAndSelect('collection_card.card', 'card')
        .leftJoinAndSelect('collection_card.collection', 'collection')
        .addSelect(
          'IF(collection_card.foil = true, card.foilValue, card.flatValue)',
          'value',
        )
        .where('collection.id = :collectionId', {
          collectionId,
        })
        .getRawMany();

    const collectionCards =
      CollectionCardService.transformRawCollectionCards(rawCollectionCards);

    return collectionCards;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionCard`;
  }

  update(id: number, updateCollectionCardDto: UpdateCollection_cardDto) {
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

  async findTradeBinderCards(collectionId: number, threshold: number) {
    return this.collectionCardRepository.find({
      where: [
        {
          tradeable: true,
          collection: {
            id: collectionId,
          },
          card: {
            foilValue: MoreThanOrEqual(threshold),
          },
        },
        {
          tradeable: true,
          collection: {
            id: collectionId,
          },
          card: {
            flatValue: MoreThanOrEqual(threshold),
          },
        },
      ],
      relations: {
        collection: true,
        card: true,
      },
    });
  }

  private buildSortOptions(orderBy: string) {
    const sortOptions = {};
    const rules = orderBy.split(',');
    for (const rule of rules) {
      sortOptions[rule.split(':')[0]] = rule.split(':')[1];
    }
    console.log(sortOptions);
    return sortOptions;
  }
}

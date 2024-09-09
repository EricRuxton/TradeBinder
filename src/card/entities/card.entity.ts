import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CollectionCard } from '../../collection_card/entities/collection_card.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scryfallId: string;

  @Column()
  name: string;

  @Column()
  cardType: string;

  @Column()
  setName: string;

  @Column()
  setCode: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  flatValue: number;

  @Column('decimal', {
    nullable: true,
    precision: 10,
    scale: 2,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  foilValue?: number;

  @Column()
  color: string;

  @Column()
  colorIdentity: string;

  @Column()
  cmc: number;

  @Column()
  cardUri: string;

  @Column()
  artUri: string;

  @Column()
  finishes: string;

  @OneToMany(() => CollectionCard, (collectionCard) => collectionCard.card)
  collectionCards: CollectionCard[];

  constructor(
    setName,
    colorIdentity,
    flatValue,
    color,
    name,
    cardType,
    cmc,
    scryfallId,
    foilValue,
    cardUri,
    artUri,
    setCode,
    finishes,
  ) {
    this.setName = setName;
    this.colorIdentity = colorIdentity;
    this.flatValue = flatValue;
    this.color = color;
    this.name = name;
    this.cardType = cardType;
    this.cmc = cmc;
    this.scryfallId = scryfallId;
    this.foilValue = foilValue;
    this.cardUri = cardUri;
    this.artUri = artUri;
    this.setCode = setCode;
    this.finishes = finishes;
  }
}

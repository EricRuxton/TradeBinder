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
  flatValue?: number;

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
  rarity: string;

  @Column()
  cardUri: string;

  @Column()
  artUri: string;

  @Column()
  finishes: string;

  @Column()
  language: string;

  @Column()
  collectorNumber: string;

  @OneToMany(() => CollectionCard, (collectionCard) => collectionCard.card)
  collectionCards?: CollectionCard[];

  constructor(partial?: Partial<Card>) {
    Object.assign(this as Card, partial);
  }
}

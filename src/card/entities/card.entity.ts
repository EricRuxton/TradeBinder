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
  value: number;

  @Column()
  color: string;

  @Column()
  colorIdentity: string;

  @Column()
  cmc: number;

  @OneToMany(() => CollectionCard, (collectionCard) => collectionCard.card)
  collectionCards: CollectionCard[];
}

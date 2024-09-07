import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from '../../collection/entities/collection.entity';
import { Card } from '../../card/entities/card.entity';

@Entity()
export class CollectionCard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collection, (collection) => collection.collectionCards)
  collection: Collection;

  @ManyToOne(() => Card, (card) => card.collectionCards)
  card: Card;

  @Column({ default: true })
  tradeable: boolean;
}

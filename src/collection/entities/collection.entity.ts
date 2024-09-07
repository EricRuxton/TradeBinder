import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CollectionCard } from '../../collection_card/entities/collection_card.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  public: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => CollectionCard,
    (collectionCard) => collectionCard.collection,
  )
  collectionCards: CollectionCard[];
}

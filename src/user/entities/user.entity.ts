import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from '../../collection/entities/collection.entity';
import { Tradebinder } from '../../tradebinder/entities/tradebinder.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column()
  token: string;

  @Column({ default: null })
  tokenExpiry: Date;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  locked: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @OneToOne(() => Collection)
  @JoinColumn()
  collection: Collection;

  @OneToOne(() => Tradebinder)
  @JoinColumn()
  tradebinder: Tradebinder;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Tradebinder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  threshold: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

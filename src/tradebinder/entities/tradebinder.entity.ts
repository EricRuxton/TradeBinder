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

  @Column('decimal', {
    default: 10.0,
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
  threshold: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: true })
  public: boolean;
}

import { User } from '../../user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  user: User;
}

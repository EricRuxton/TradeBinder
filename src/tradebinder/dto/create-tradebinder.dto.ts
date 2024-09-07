import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateTradebinderDto {
  @IsNotEmpty()
  user: User;
}

import { Tradebinder } from '../../tradebinder/entities/tradebinder.entity';
import { Collection } from '../../collection/entities/collection.entity';

export class UpdateUserDto {
  verified?: boolean;
  locked?: boolean;
  username?: string;
  tradebinder?: Tradebinder;
  collection?: Collection;
}

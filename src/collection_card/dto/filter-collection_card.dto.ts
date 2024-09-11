import { PartialType } from '@nestjs/mapped-types';
import { Card } from '../../card/entities/card.entity';

enum ORDER {
  asc = 'ASC',
  desc = 'DESC',
}

enum ORDER_PARAMS {
  name = 'name',
  card_type = 'cardType',
  set_name = 'setName',
  set_code = 'setCode',
  color = 'color',
  rarity = 'rarity',
}

export class CardFilterDto extends PartialType(Card) {
  foil: string;
  orderBy: string;
  order: ORDER;
  value: number;
  take: number;
  page: number;
}

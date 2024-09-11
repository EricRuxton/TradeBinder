import { PartialType } from '@nestjs/mapped-types';
import { Card } from '../../card/entities/card.entity';

export class CardFilterDto extends PartialType(Card) {
  foil: string;
  orderBy: string;
  value: number;
  take: number;
  page: number;
}

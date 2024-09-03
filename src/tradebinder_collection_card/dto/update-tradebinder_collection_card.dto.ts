import { PartialType } from '@nestjs/mapped-types';
import { CreateTradebinderCollectionCardDto } from './create-tradebinder_collection_card.dto';

export class UpdateTradebinderCollectionCardDto extends PartialType(
  CreateTradebinderCollectionCardDto,
) {}

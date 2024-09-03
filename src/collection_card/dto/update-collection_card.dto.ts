import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionCardDto } from './create-collection_card.dto';

export class UpdateCollectionCardDto extends PartialType(
  CreateCollectionCardDto,
) {}

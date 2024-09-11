import { PartialType } from '@nestjs/mapped-types';
import { CreateCollection_cardDto } from './create-collection_card.dto';

export class UpdateCollection_cardDto extends PartialType(
  CreateCollection_cardDto,
) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTradebinderDto } from './create-tradebinder.dto';

export class UpdateTradebinderDto extends PartialType(CreateTradebinderDto) {}

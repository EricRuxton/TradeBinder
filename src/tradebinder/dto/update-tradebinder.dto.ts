import { IsNotEmpty } from 'class-validator';

export class UpdateTradebinderDto {
  @IsNotEmpty()
  threshold: number;
}

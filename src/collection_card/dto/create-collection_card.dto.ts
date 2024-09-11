import { IsNotEmpty } from 'class-validator';

export class CreateCollection_cardDto {
  @IsNotEmpty()
  scryfallId: string;

  @IsNotEmpty()
  foil: boolean;

  @IsNotEmpty()
  tradeable: boolean;
}

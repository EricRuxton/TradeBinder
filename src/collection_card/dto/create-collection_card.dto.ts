import { IsNotEmpty } from 'class-validator';

export class CreateCollectionCardDto {
  @IsNotEmpty()
  scryfallId: string;

  @IsNotEmpty()
  foil: boolean;

  @IsNotEmpty()
  tradeable: boolean;
}

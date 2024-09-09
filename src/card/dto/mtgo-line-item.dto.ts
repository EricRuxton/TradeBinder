import { IsNotEmpty } from 'class-validator';

export class MtgoLineItemDto {
  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  name: string;
}

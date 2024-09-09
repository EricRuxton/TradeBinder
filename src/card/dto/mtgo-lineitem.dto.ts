import { IsNotEmpty } from 'class-validator';

export class MtgoLineitemDto {
  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  name: string;
}

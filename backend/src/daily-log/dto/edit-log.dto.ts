import { IsNotEmpty, IsNumber } from "class-validator";

export class EditLogDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

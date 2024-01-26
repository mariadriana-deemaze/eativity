import { MealLogType } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLogDto {
  @IsNumber()
  @IsNotEmpty()
  foodId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  type: MealLogType;
}

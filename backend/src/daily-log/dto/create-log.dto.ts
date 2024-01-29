import { MealLogType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLogDto {
  @IsNumber()
  @IsNotEmpty()
  foodId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsEnum(MealLogType)
  @IsNotEmpty()
  type: MealLogType;
}

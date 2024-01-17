import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  barcode?: string;

  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @IsNumber()
  @IsNotEmpty()
  carbohydrates: number;

  @IsNumber()
  @IsNotEmpty()
  proteins: number;

  @IsNumber()
  @IsNotEmpty()
  fats: number;

  @IsNumber()
  @IsNotEmpty()
  servingSize: number;

  @IsString()
  image?: string;
}

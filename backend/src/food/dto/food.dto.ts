import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  imageId?: string;
}

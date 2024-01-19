import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

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

  @IsString()
  @IsOptional()
  imageId?: string;
}

import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
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
  @IsNotEmpty()
  image: string;
}

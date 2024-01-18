import { /* NutrionalValues, */ Record } from ".";

export interface Food extends Record {
  name: string;
  description: string;
  image: string;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  servingSize: number;
  barcode: string;
  //nutrition: NutrionalValues;
  //types: string[];
}

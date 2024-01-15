import { NutrionalValues, Record } from ".";

export interface Food extends Record {
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  nutrition: NutrionalValues;
  types: string[];
}

import { NutrionalValues, Record } from ".";

export interface Recipe extends Record {
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  nutrition: NutrionalValues;
  types: string[];
}

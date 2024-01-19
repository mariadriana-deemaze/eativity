import { Record } from ".";

export interface Recipe extends Record {
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  description?: string;
  image?: string;
}

export type PostRecipe = Omit<Recipe, keyof Record>;

export type PatchRecipe = Omit<Recipe, keyof Record>;

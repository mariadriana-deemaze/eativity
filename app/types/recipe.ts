import { CompactRecord, Record } from ".";

export interface CompactRecipeCategory extends CompactRecord {
  title: string;
}

export interface RecipeCategory extends Record {
  title: string;
  image?: string;
}

export interface Recipe extends Record {
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  description?: string;
  image?: string;
  categories?: CompactRecipeCategory[];
}

export type PostRecipe = Omit<Recipe, keyof Record>;

export type PatchRecipe = Omit<Recipe, keyof Record>;

import { CompactRecord, Image, Record } from ".";

export interface CompactRecipeCategory extends CompactRecord {
  title: string;
}

export interface RecipeCategory extends Record {
  title: string;
  image?: Image;
}

export interface Recipe extends Record {
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  description?: string;
  image?: Image;
  categories?: CompactRecipeCategory[];
}

export type PostRecipe = Omit<Recipe, keyof Record | "image"> & {
  image: string;
};

export type PatchRecipe = Omit<Recipe, keyof Record | "image"> & {
  image: string;
};

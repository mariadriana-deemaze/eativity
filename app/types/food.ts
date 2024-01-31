import { Image, Record } from ".";

export interface Food extends Record {
  name: string;
  description: string;
  image: Image;
  calories: number;
  carbohydrates: number;
  fats: number;
  proteins: number;
  servingSize: number;
  barcode: string;
}

export type PatchFood = Omit<Food, keyof Record>;

export type PostFood = Omit<Food, keyof Record>;

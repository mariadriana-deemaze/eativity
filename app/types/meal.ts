import { Food } from "./food";
import { Record } from "./shared";

export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK",
}

export interface Meal extends Record {
  name: string;
  quantity: number;
  type: MealType;
  foodId: number;
}

export interface MealLog {
  quantity: number;
  type: MealType;
  foodId: number;
  food: Food;
}

export type PostMealLogEntry = Omit<MealLog, keyof Record | "food">;
export type PatchMealLogEntry = Omit<MealLog, keyof Record | "food">;

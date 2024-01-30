import { Food } from "./food";
import { Record } from "./shared";

export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK",
}

export interface MealLog extends Record {
  quantity: number;
  type: MealType;
  foodId: number;
  food: Food;
}

export type PostMealLogEntry = Omit<MealLog, keyof Record | "food">;
export type PatchMealLogEntry = Omit<MealLog, keyof Record | "food">;

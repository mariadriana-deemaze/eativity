import { Food } from "./food";
import { Record } from "./shared";

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}

export interface Meal extends Record {
  name: string;
  quantity: number;
  type: MealType;
  foodId: string;
}

export interface MealLog extends Food {
  quantity: number;
  type: MealType;
  foodId: string;
}

export type PostMealLogEntry = Omit<MealLog, keyof Record>;
export type PatchMealLogEntry = Omit<MealLog, keyof Record>;

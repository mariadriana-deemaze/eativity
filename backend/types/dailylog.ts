import { Food, MealLog } from "@prisma/client";

export type FoodLogRecord = MealLog & { food: Food };

export interface TotalIntakes {
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
}
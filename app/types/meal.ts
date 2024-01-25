import { Record } from "./shared";

export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}

export interface Meal extends Record {
  name: string;
  type: MealType;
  foodId: string;
}

import { Meal, MealType } from "../types";

export const gretting = () => {
  const currentHour = new Date().getHours();
  let greeting = "";

  const isMorning = currentHour > 5 && currentHour <= 12;
  const isAfternoon = currentHour > 12 && currentHour <= 18;
  const isEvening = currentHour > 18 && currentHour <= 22;
  const isNight = currentHour > 22 || currentHour <= 5;

  if (isMorning) greeting = "Good morning";
  if (isAfternoon) greeting = "Good afternoon";
  if (isEvening) greeting = "Good evening";
  if (isNight) greeting = "Good night";

  return greeting;
};

export const greetMissingMeal = (dailyMeals: Meal[]) => {
  const currentHour = new Date().getHours();

  // Time frames
  const breakfastTimeFrame = currentHour > 5 && currentHour <= 11;
  const lunchTimeFrame = currentHour > 12 && currentHour <= 14;
  const dinnerTimeFrame = currentHour > 18 && currentHour <= 22;

  // Daily meals index
  const hasHadBreakfast =
    dailyMeals.findIndex((item) => item.type === MealType.BREAKFAST) !== -1;
  const hasHadLunch =
    dailyMeals.findIndex((item) => item.type === MealType.LUNCH) !== -1;
  const hasHadDinner =
    dailyMeals.findIndex((item) => item.type === MealType.DINNER) !== -1;

  if (breakfastTimeFrame && !hasHadBreakfast) {
    return "Have you eaten breakfast yet?";
  } else if (lunchTimeFrame && !hasHadLunch) {
    return "Have you eaten lunch yet?";
  } else if (dinnerTimeFrame && !hasHadDinner) {
    return "Have you eaten dinner yet?";
  } else {
    return "Feeling snackish?";
  }
};

export const pluralize = (length: number, string: string) => {
  return length === 1 ? string : string + "s";
};

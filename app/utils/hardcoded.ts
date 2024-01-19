/**
 *
 * TODO: This whole file is here only for dev purposes - eliminate progressively
 *
 *  */

import { PostRecipe } from "../types";

export const signUpDefaultDevData = {
  name: "Maria Adriana",
  email: "m@gmail.com",
  password: "123",
  password_repeat: "123",
};

export const signInDefaultDevData = {
  name: "Maria Adriana",
  email: "m@gmail.com",
  password: "123",
};

export const categories: string[] = [
  "Appetizer",
  "Soup",
  "Main Dish",
  "Side Dish",
  "Baked",
  "Salad and Salad Dressing",
  "Sauce and Condiment",
  "Dessert",
  "Snack",
  "Beverage",
  "Other",
  "Breakfast",
  "Lunch",
];

export const newRecipeDummy: PostRecipe = {
  name: "Novinho",
  description: "descrição fixe",
  image: "link imagem",
  calories: 1,
  carbohydrates: 1,
  fats: 1,
  proteins: 1,
};

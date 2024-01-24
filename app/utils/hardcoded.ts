/**
 *
 * TODO: This whole file is here only for dev purposes - eliminate progressively
 *
 *  */

import { PostRecipe, Recipe } from "../types";

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

export const DUMMY_RECOMMENDED_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "nOT SO Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image:
      "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

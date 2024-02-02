/**
 *
 * TODO: This whole file is here only for dev purposes - eliminate progressively
 *
 *  */

import { faker } from "@faker-js/faker";

import { MealLog, MealType, MediaType, PostRecipe, Recipe } from "../types";

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
    id: 1,
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [
      {
        id: 1,
        title: "Lunch",
      },
      {
        id: 2,
        title: "Vegetarian",
      },
    ],
    image: {
      id: 1,
      type: MediaType.IMAGE,
      path: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 2,
    name: "Nice eggs",
    description: "Sunny sided and creammy",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: {
      id: 2,
      type: MediaType.IMAGE,
      path: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 3,
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [
      {
        id: 1,
        title: "Lunch",
      },
    ],
    image: {
      id: 3,
      type: MediaType.IMAGE,
      path: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 4,
    name: "Creamy Salad Dressing",
    description:
      "A creamy salad dressing with all the taste and far less calories.",
    calories: 85,
    carbohydrates: 11.94,
    fats: 1.82,
    proteins: 6.38,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: {
      id: 4,
      type: MediaType.IMAGE,
      path: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=3715&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

export const DUMMY_USER_DAILY_MEALS: MealLog[] = [
  {
    id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    foodId: 1,
    type: MealType.BREAKFAST,
    quantity: 2,
    food: {
      id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3),
      calories: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      carbohydrates: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      proteins: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      fats: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      servingSize: faker.helpers.rangeToNumber({ min: 0, max: 6 }),
      image: {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: MediaType.IMAGE,
        path: faker.image.urlLoremFlickr({ category: "food" }),
      },
      barcode: faker.commerce.isbn(),
    },
  },
  {
    id: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    foodId: 13,
    type: MealType.BREAKFAST,
    quantity: 2,
    food: {
      id: 13,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3),
      calories: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      carbohydrates: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      proteins: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      fats: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      servingSize: faker.helpers.rangeToNumber({ min: 0, max: 6 }),
      image: {
        id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: MediaType.IMAGE,
        path: faker.image.urlLoremFlickr({ category: "food" }),
      },
      barcode: faker.commerce.isbn(),
    },
  },
  {
    id: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    foodId: 24,
    type: MealType.LUNCH,
    quantity: 2,
    food: {
      id: 24,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3),
      calories: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      carbohydrates: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      proteins: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      fats: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      servingSize: faker.helpers.rangeToNumber({ min: 0, max: 6 }),
      image: {
        id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: MediaType.IMAGE,
        path: faker.image.urlLoremFlickr({ category: "food" }),
      },
      barcode: faker.commerce.isbn(),
    },
  },
];

export const DUMMY_AUTOCOMPLETE_FOOD = [
  { name: faker.lorem.word(), id: 1 },
  { name: faker.lorem.word(), id: 2 },
  { name: faker.lorem.word(), id: 3 },
  { name: faker.lorem.word(), id: 4 },
  { name: faker.lorem.word(), id: 5 },
  { name: faker.lorem.word(), id: 6 },
  { name: faker.lorem.word(), id: 7 },
  { name: faker.lorem.word(), id: 8 },
];

import { Recipe } from "../types/recipe";

/**
 *
 * TODO: This whole file is here only for dev purposes - eliminate progressively
 *
 *  */

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

export const recipe: Recipe[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Aafreen Khan",
    description: "Aafreen Khan",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ingredients: ["carrots", "onion"],
    nutrition: {
      calories: 0,
      carbohydrate: 0,
      fat: 0,
      protein: 0,
    },
    types: ["Appetizer", "Soup"],
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Sujitha Mathur",
    description: "Aafreen Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    ingredients: ["carrots", "onion"],
    nutrition: {
      calories: 0,
      carbohydrate: 0,
      fat: 0,
      protein: 0,
    },
    types: ["Appetizer", "Soup"],
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    name: "Kiara",
    description: "Aafreen Khan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    ingredients: ["carrots", "onion"],
    nutrition: {
      calories: 0,
      carbohydrate: 0,
      fat: 0,
      protein: 0,
    },
    types: ["Appetizer", "Soup"],
  },
];

import { api, API_URL } from "./api";

import {
  Food,
  PaginatedPayload,
  PaginationParameters,
  PostFood,
  PatchFood
} from "../types";

const formatPayload = (food: Food) => {
  const formatted: PostFood | PatchFood = {
    name: food.name,
    description: food.description,
    carbohydrates: Number(food.carbohydrates),
    proteins: Number(food.proteins),
    calories: Number(food.calories),
    fats: Number(food.fats),
    servingSize: Number(food.servingSize),
    barcode: food.barcode,
    image: food.image,
  };

  return formatted;
};

export const getFoods = async (
  searchName?: string,
  paginationParameters?: PaginationParameters
): Promise<PaginatedPayload<Food>> => {
  let url = `${API_URL}/food/`;

  url += `search?name=${searchName || ""}`;

  return await api
    .get(url, { params: paginationParameters })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getFoodById = async ({ id }: { id: string }): Promise<Food> => {
  return await api
    .get(`${API_URL}/food/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const createFood = async (food: Food): Promise<Food> => {
  const newFood: PostFood = formatPayload(food);

  return await api
    .post(`${API_URL}/food/`, newFood)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateFood = async (food: Food): Promise<Food> => {
  const updatedFood: PatchFood = formatPayload(food);

  return await api
    .patch(`${API_URL}/food/${food.id}`, updatedFood)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

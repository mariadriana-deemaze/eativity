import { api, API_URL } from "./api";
import { Food, PaginatedPayload, PaginationParameters } from "../types";

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

export const createFood = async ({ food }: { food: Food }): Promise<Food> => {
  return await api
    .post(`${API_URL}/food/`, food)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

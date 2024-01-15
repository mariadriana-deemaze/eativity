import { api, API_URL } from "./api";
import { Recipe } from "../types";

export const getRecipes = async ({
  searchName,
}: {
  searchName: string;
}): Promise<Recipe[]> => {
  return await api
    .get(`${API_URL}/recipe/search?name=${searchName}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getRecipeById = async ({
  id,
}: {
  id: string;
}): Promise<Recipe> => {
  return await api
    .get(`${API_URL}/recipe/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

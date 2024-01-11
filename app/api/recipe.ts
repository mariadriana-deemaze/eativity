import { api, API_URL } from ".";

import { Recipe } from "../types/recipe";

// TODO: Remove default
export const getRecipe = async ({
  searchName = "Toast",
}: {
  searchName: string;
}) => {
  return await api
    .get(`${API_URL}/recipe/search?name=${searchName}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => err);
};

// TODO: Remove default
export const getRecipeById = async ({ id = "1" }: { id: string }) => {
  return await api
    .get(`${API_URL}/recipe/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => err);
};

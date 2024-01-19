import { api, API_URL } from "./api";
import {
  Recipe,
  PaginationParameters,
  PaginatedPayload,
  PostRecipe,
  PatchRecipe,
} from "../types";

const formatPayload = (recipe: Recipe) => {
  const formatted: PostRecipe | PatchRecipe = {
    name: recipe.name,
    description: recipe.description,
    carbohydrates: Number(recipe.carbohydrates),
    proteins: Number(recipe.proteins),
    calories: Number(recipe.calories),
    fats: Number(recipe.fats),
    image: recipe.image,
  };

  return formatted;
};

export const getRecipes = async (
  searchName?: string,
  paginationParameters?: PaginationParameters
): Promise<PaginatedPayload<Recipe>> => {
  let url = `${API_URL}/recipe/`;

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

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const payload: PostRecipe = formatPayload(recipe);

  return await api
    .post(`${API_URL}/recipe/`, payload)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const payload: PatchRecipe = formatPayload(recipe);

  return await api
    .patch(`${API_URL}/recipe/${recipe.id}`, payload)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

import { api, API_URL } from "./api";
import {
  Recipe,
  PaginationParameters,
  PaginatedPayload,
  PostRecipe,
  PatchRecipe,
} from "../types";

const formatPayload = (recipe: PostRecipe | PatchRecipe) => {
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

export const createRecipe = async (recipe: PostRecipe): Promise<Recipe> => {
  const payload = formatPayload(recipe);

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

export const updateRecipe = async (
  entryId: number,
  recipe: PatchRecipe
): Promise<Recipe> => {
  const payload = formatPayload(recipe);

  return await api
    .patch(`${API_URL}/recipe/${entryId}`, payload)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

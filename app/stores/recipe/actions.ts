import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
} from "../../api";

import { PaginationParameters, PatchRecipe, PostRecipe } from "./../../types";

export const getRecipesFromSearch = createAsyncThunk(
  "getRecipeNameSearch",
  async (
    {
      search,
      pagination,
    }: {
      search?: string;
      pagination: PaginationParameters;
    },
    { rejectWithValue }
  ) => {
    try {
      return await getRecipes(search, pagination);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

export const getRecipeInfo = createAsyncThunk(
  "getRecipeInfoById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getRecipeById({ id });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

export const createNewRecipe = createAsyncThunk(
  "createRecipe",
  async ({ recipe }: { recipe: PostRecipe }, { rejectWithValue }) => {
    try {
      return await createRecipe(recipe);
    } catch (error) {
      console.log("THUNK error ->", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

export const updateRecipeInfo = createAsyncThunk(
  "updateRecipeInfoById",
  async (
    { id, recipe }: { id: number; recipe: PatchRecipe },
    { rejectWithValue }
  ) => {
    try {
      return await updateRecipe(id, recipe);
    } catch (error) {
      console.log("THUNK error ->", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

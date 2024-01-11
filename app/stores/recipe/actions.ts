import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRecipe, getRecipeById } from "../../api";

import { Recipe } from "../../types/recipe";

export const getRecipesFromSearch = createAsyncThunk(
  "getRecipeNameSearch",
  async (_recipe: Recipe, { rejectWithValue }) => {
    try {
      return await getRecipe({ searchName: "Torradas" });
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
      return await getRecipeById({ id: "1" });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

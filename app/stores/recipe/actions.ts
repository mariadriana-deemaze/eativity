import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRecipes, getRecipeById, ErrorResponse } from "../../api";

export const getRecipesFromSearch = createAsyncThunk(
  "getRecipeNameSearch",
  async (searchName: string, { rejectWithValue }) => {
    try {
      return await getRecipes({ searchName });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message as ErrorResponse);
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
        return rejectWithValue(error.response.data.message as ErrorResponse);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

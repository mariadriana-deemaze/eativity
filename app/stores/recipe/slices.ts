import { createSlice } from "@reduxjs/toolkit";

import { getRecipesFromSearch, getRecipeInfo } from "./actions";

import { Recipe } from "../../types/recipe";

interface InitialState {
  loading: boolean;
  recipe: Recipe | null;
  recipes: Recipe[] | null;
  error: string | null | unknown;
  success: boolean;
}

const initialState: InitialState = {
  recipe: null,
  recipes: null,
  loading: false,
  error: null,
  success: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeInfo(state) {
      Object.assign(state, null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesFromSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipesFromSearch.fulfilled, (state, { payload: recipe }) => {
        state.loading = false;
        state.success = true;
        state.recipe = recipe;
      })
      .addCase(getRecipesFromSearch.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getRecipeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeInfo.fulfilled, (state, { payload: recipe }) => {
        state.loading = false;
        state.success = true;
        state.recipe = recipe;
      })
      .addCase(getRecipeInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;

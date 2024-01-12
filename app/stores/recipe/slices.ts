import { createSlice } from "@reduxjs/toolkit";

import { getRecipesFromSearch, getRecipeInfo } from "./actions";

import { Recipe } from "../../types/recipe";

interface InitialState {
  loading: boolean;
  recipe: Recipe | null;
  recipes: Recipe[] | null;
  error: string | null;
}

const initialState: InitialState = {
  recipe: null,
  recipes: null,
  loading: false,
  error: null,
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
      .addCase(
        getRecipesFromSearch.fulfilled,
        (state, { payload: recipes }) => {
          state.loading = false;
          state.recipes = recipes;
        }
      )
      .addCase(getRecipesFromSearch.rejected, (state, { payload: error }) => {
        state.loading = false;
        // @ts-ignore
        state.error = error;
      })
      .addCase(getRecipeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeInfo.fulfilled, (state, { payload: recipe }) => {
        state.loading = false;
        state.recipe = recipe;
      })
      .addCase(getRecipeInfo.rejected, (state, { payload: error }) => {
        state.loading = false;
        // @ts-ignore
        state.error = error;
      });
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;

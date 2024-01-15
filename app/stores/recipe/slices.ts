import { createSlice } from "@reduxjs/toolkit";

import { getRecipesFromSearch, getRecipeInfo } from "./actions";

import {
  ToastInfoProps,
  defaultNetworkErrorMessage,
} from "../../components/toastAlert";

import { Recipe } from "../../types/recipe";

import { recipe } from "../../utils";

interface InitialState {
  loading: boolean;
  recipe: Recipe | null;
  recipes: Recipe[] | null;
  error: ToastInfoProps | null;
  category: string;
  search?: string;
}

const initialState: InitialState = {
  recipe: recipe[0],
  recipes: null,
  loading: false,
  error: null,
  category: "All",
  search: undefined,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeInfo(state) {
      Object.assign(state, null);
    },
    setSearch(state, action) {
      Object.assign(state, {
        ...state,
        search: action.payload,
      });
      console.log("state ->", state);
    },
    setCategory(state, action) {
      Object.assign(state, {
        ...state,
        category: action.payload,
      });
      console.log("state ->", state);
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
      .addCase(getRecipesFromSearch.rejected, (state) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      })
      .addCase(getRecipeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeInfo.fulfilled, (state, { payload: recipe }) => {
        state.loading = false;
        state.recipe = recipe;
      })
      .addCase(getRecipeInfo.rejected, (state) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      });
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { getRecipesFromSearch, getRecipeInfo } from "./actions";

import {
  ToastInfoProps,
  defaultNetworkErrorMessage,
} from "../../components/toastAlert";

import { Recipe } from "../../types/recipe";

import { PaginatedPayload } from "../../types";

interface InitialState {
  loading: boolean;
  recipe: Recipe | null;
  recipes: PaginatedPayload<Recipe>;
  error: ToastInfoProps | null;
  category: string;
  search?: string;
}

const initialState: InitialState = {
  recipe: null,
  recipes: { data: [], pagination: { count: 0, offset: 0, maxResults: 0 } },
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
        (state, { payload: paginatedRecipes }) => {
          Object.assign(state, {
            ...state,
            loading: false,
            recipes: {
              // TODO: Review
              data:
                state.recipes.data.length < paginatedRecipes?.pagination?.count
                  ? [...state?.recipes?.data, ...paginatedRecipes?.data]
                  : [...state?.recipes?.data],
              pagination: {
                count: paginatedRecipes?.pagination?.count || 0,
                offset: paginatedRecipes?.pagination?.offset || 0,
                maxResults: paginatedRecipes?.pagination?.maxResults || 0,
              },
            },
          });
        },
      )
      .addCase(
        getRecipesFromSearch.rejected,
        (state, { payload: errorPayload }) => {
          state.loading = false;
          state.error = errorPayload || defaultNetworkErrorMessage;
        },
      )
      .addCase(getRecipeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeInfo.fulfilled, (state, { payload: recipe }) => {
        state.loading = false;
        state.recipe = recipe;
      })
      .addCase(getRecipeInfo.rejected, (state, { payload: errorPayload }) => {
        state.loading = false;
        state.error = errorPayload || defaultNetworkErrorMessage;
      });
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;

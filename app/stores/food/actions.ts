import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFoods, getFoodById, updateFood, createFood } from "../../api";

import { Food, PaginationParameters } from "../../types";

export const getFoodsFromSearch = createAsyncThunk(
  "getFoodNameSearch",
  async (
    {
      search,
      pagination,
    }: {
      search?: string;
      pagination?: PaginationParameters;
    },
    { rejectWithValue },
  ) => {
    try {
      return await getFoods(search, pagination);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  },
);

export const getFoodInfo = createAsyncThunk(
  "getFoodInfoById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getFoodById({ id });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  },
);

export const createNewFood = createAsyncThunk(
  "createFood",
  async (food: Food, { rejectWithValue }) => {
    try {
      return await createFood(food);
    } catch (error) {
      console.log("THUNK error ->", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  },
);

export const updateFoodInfo = createAsyncThunk(
  "updateFoodInfoById",
  async (food: Food, { rejectWithValue }) => {
    try {
      return await updateFood(food);
    } catch (error) {
      console.log("THUNK error ->", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  },
);

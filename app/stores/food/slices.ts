import { createSlice } from "@reduxjs/toolkit";

import { getFoodsFromSearch, getFoodInfo, updateFoodInfo } from "./actions";

import {
  ToastInfoProps,
  defaultNetworkErrorMessage,
} from "../../components/toastAlert";

import { PaginatedPayload, Food } from "../../types";

interface InitialState {
  loading: boolean;
  food: Food | null;
  foods: PaginatedPayload<Food>;
  error: ToastInfoProps | null;
  search?: string;
}

const initialState: InitialState = {
  food: null,
  foods: { data: [], pagination: { count: 0, offset: 0, maxResults: 0 } },
  loading: false,
  error: null,
  search: undefined,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoodInfo(state) {
      Object.assign(state, null);
    },
    setSearch(state, action) {
      Object.assign(state, {
        ...state,
        search: action.payload,
        foods: initialState.foods,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoodsFromSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFoodsFromSearch.fulfilled,
        (state, { payload: paginatedFoods }) => {
          Object.assign(state, {
            ...state,
            loading: false,
            foods: {
              // TODO: Review
              data:
                state.foods.data.length < paginatedFoods?.pagination?.count
                  ? [...state?.foods?.data, ...paginatedFoods?.data]
                  : [...state?.foods?.data],
              pagination: {
                count: paginatedFoods?.pagination?.count || 0,
                offset: paginatedFoods?.pagination?.offset || 0,
                maxResults: paginatedFoods?.pagination?.maxResults || 0,
              },
            },
          });
        }
      )
      .addCase(
        getFoodsFromSearch.rejected,
        (state, { payload: errorPayload }) => {
          state.loading = false;
          state.error = errorPayload || defaultNetworkErrorMessage;
        }
      )
      .addCase(getFoodInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodInfo.fulfilled, (state, { payload: food }) => {
        state.loading = false;
        state.food = food;
      })
      .addCase(getFoodInfo.rejected, (state, { payload: errorPayload }) => {
        state.loading = false;
        state.error = errorPayload || defaultNetworkErrorMessage;
      })
      .addCase(updateFoodInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFoodInfo.fulfilled, (state, { payload: food }) => {
        state.loading = false;
        state.food = food;
      })
      .addCase(updateFoodInfo.rejected, (state, { payload: errorPayload }) => {
        state.loading = false;
        state.error = errorPayload || defaultNetworkErrorMessage;
      });
  },
});

export const foodActions = foodSlice.actions;

export default foodSlice.reducer;

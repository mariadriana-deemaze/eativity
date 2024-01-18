import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import authReducer from "./auth/slices";

import userReducer from "./user/slices";

import recipeReducer from "./recipe/slices";

import foodReducer from "./food/slices";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  recipe: recipeReducer,
  food: foodReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

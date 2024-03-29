import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import authReducer from "./auth/slices";

import userReducer from "./user/slices";

import recipeReducer from "./recipe/slices";

import foodReducer from "./food/slices";

import dailyLogReducer from "./dailylog/slices";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  recipe: recipeReducer,
  food: foodReducer,
  dailylog: dailyLogReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

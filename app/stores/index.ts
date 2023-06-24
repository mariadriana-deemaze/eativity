import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import authReducer from "./auth/slices";

const rootReducer = combineReducers({ auth: authReducer });

const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

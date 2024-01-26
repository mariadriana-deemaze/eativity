/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

import { createLogEntry, getDailyLogs, updateLogEntry } from "./actions";

import {
  ToastInfoProps,
  defaultNetworkErrorMessage,
} from "../../components/toastAlert";

import { MealType, MealLog } from "../../types";

interface InitialState {
  log: Record<MealType, MealLog[]>;
  loading: boolean;
  error: ToastInfoProps | null;
}

const initialState: InitialState = {
  log: {
    [MealType.BREAKFAST]: [],
    [MealType.LUNCH]: [],
    [MealType.DINNER]: [],
    [MealType.SNACK]: [],
  },
  loading: false,
  error: null,
};

const dailyLog = createSlice({
  name: "dailylog",
  initialState,
  reducers: {
    setCachedLogEntries(state, action) {
      Object.assign(state, {
        ...state,
        log: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Get logs
      .addCase(getDailyLogs.pending, (state, { payload }) => {
        // TODO
      })
      .addCase(getDailyLogs.fulfilled, (state, { payload }) => {
        // TODO
        /* Object.assign(state, {
          ...state,
          log: payload,
        }); */
      })
      .addCase(getDailyLogs.rejected, (state, { payload }) => {
        // TODO
        Object.assign(state, {
          ...state,
          error: payload || defaultNetworkErrorMessage,
        });
      })

      // Create log
      .addCase(createLogEntry.pending, (state, { payload }) => {
        // TODO
      })
      .addCase(createLogEntry.fulfilled, (state, { payload }) => {
        // TODO
        /* Object.assign(state, {
          ...state,
          log: payload,
        }); */
      })
      .addCase(createLogEntry.rejected, (state, { payload }) => {
        // TODO
        Object.assign(state, {
          ...state,
          error: payload || defaultNetworkErrorMessage,
        });
      })

      // Update log
      .addCase(updateLogEntry.pending, (state, { payload }) => {
        // TODO
      })
      .addCase(updateLogEntry.fulfilled, (state, { payload }) => {
        // TODO
        /* Object.assign(state, {
          ...state,
          log: payload,
        }); */
      })
      .addCase(updateLogEntry.rejected, (state, { payload }) => {
        // TODO
        Object.assign(state, {
          ...state,
          error: payload || defaultNetworkErrorMessage,
        });
      });
  },
});

export const dailyLogActions = dailyLog.actions;

export default dailyLog.reducer;

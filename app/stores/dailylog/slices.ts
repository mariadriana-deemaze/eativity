/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import {
  createLogEntry,
  getDailyLogs,
  updateLogEntry,
  deleteLogEntry,
} from "./actions";

import {
  ToastInfoProps,
  defaultNetworkErrorMessage,
} from "../../components/toastAlert";

import { MealType, MealLog, Meal } from "../../types";

interface InitialState {
  log: Record<MealType, Meal[]>;
  loading: boolean;
  error: ToastInfoProps | null;
}

const defaultMealLog = {
  [MealType.BREAKFAST]: [],
  [MealType.LUNCH]: [],
  [MealType.DINNER]: [],
  [MealType.SNACK]: [],
};

const initialState: InitialState = {
  log: defaultMealLog,
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
      .addCase(getDailyLogs.pending, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          loading: true,
        });
      })
      .addCase(getDailyLogs.fulfilled, (state, { payload: entryLogs }) => {
        Object.assign(state, {
          ...state,
          loading: false,
          log: { ...defaultMealLog, ...entryLogs },
        });
      })
      .addCase(getDailyLogs.rejected, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          loading: false,
          error: payload || defaultNetworkErrorMessage,
        });
      })
      .addCase(createLogEntry.pending, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          loading: true,
        });
      })
      .addCase(createLogEntry.fulfilled, (state, { payload }) => {
        const updatedLog = {
          ...state.log,
          [payload.type]: [...state.log[payload.type], payload],
        };

        Object.assign(state, {
          ...state,
          loading: false,
          log: updatedLog,
        });
      })
      .addCase(createLogEntry.rejected, (state, { payload }) => {
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
      })
      //
      // Delete log
      .addCase(deleteLogEntry.pending, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          loading: true,
        });
      })
      .addCase(deleteLogEntry.fulfilled, (state, { payload }) => {
        // @ts-ignore
        const updatedLog = {
          ...state.log,
          [payload.type]: state.log[payload.type].filter(
            (log) => log.id !== payload.id
          ),
        };

        // TODO
        Object.assign(state, {
          ...state,
          log: updatedLog,
          loading: false,
        });
      })
      .addCase(deleteLogEntry.rejected, (state, { payload }) => {
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

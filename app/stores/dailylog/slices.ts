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

import { MealType, MealLog } from "../../types";

interface InitialState {
  logsLoaded: false;
  log: Record<MealType, MealLog[]>;
  mutating: false;
  error: ToastInfoProps | null;
}

const defaultMealLog = {
  [MealType.BREAKFAST]: [],
  [MealType.LUNCH]: [],
  [MealType.DINNER]: [],
  [MealType.SNACK]: [],
};

const initialState: InitialState = {
  logsLoaded: false,
  log: defaultMealLog,
  mutating: false,
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
      // ---
      // Get user daily logs
      .addCase(getDailyLogs.pending, (state) => {
        Object.assign(state, {
          ...state,
          mutating: true,
        });
      })
      .addCase(getDailyLogs.fulfilled, (state, { payload: entryLogs }) => {
        Object.assign(state, {
          ...state,
          logsLoaded: true,
          mutating: false,
          log: { ...defaultMealLog, ...entryLogs },
        });
      })
      .addCase(getDailyLogs.rejected, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          mutating: false,
          error: payload || defaultNetworkErrorMessage,
        });
      })
      // ---
      // Create log
      .addCase(createLogEntry.pending, (state) => {
        Object.assign(state, {
          ...state,
          mutating: true,
        });
      })
      .addCase(createLogEntry.fulfilled, (state, { payload }) => {
        console.log("payload ->", payload);

        const updatedLog = {
          ...state.log,
          [payload.type]: [...state.log[payload.type], payload],
        };

        console.log("UPDATED ->", updatedLog);

        Object.assign(state, {
          ...state,
          mutating: false,
          log: updatedLog,
        });
      })
      .addCase(createLogEntry.rejected, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          mutating: false,
          error: payload || defaultNetworkErrorMessage,
        });
      })
      // ---
      // Update log
      .addCase(updateLogEntry.pending, (state) => {
        Object.assign(state, {
          ...state,
          mutating: true,
        });
      })
      .addCase(updateLogEntry.fulfilled, (state, { payload }) => {
        const logIndex = state.log[payload.type].findIndex(
          (log) => log.id === payload.id
        );

        const updatedLog = {
          ...state.log,
          [payload.type]: state.log[payload.type].splice(logIndex, 1, payload),
        };

        if (logIndex > 0) {
          Object.assign(state, {
            ...state,
            mutating: false,
            log: updatedLog,
          });
        } else {
          Object.assign(state, {
            ...state,
            mutating: false,
          });
        }
      })
      .addCase(updateLogEntry.rejected, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          mutating: false,
          error: payload || defaultNetworkErrorMessage,
        });
      })
      // ---
      // Delete log
      .addCase(deleteLogEntry.pending, (state) => {
        Object.assign(state, {
          ...state,
          mutating: true,
        });
      })
      .addCase(deleteLogEntry.fulfilled, (state, { payload }) => {
        const updatedLog = {
          ...state.log,
          [payload.type]: state.log[payload.type].filter(
            (log) => log.id !== payload.id
          ),
        };

        Object.assign(state, {
          ...state,
          log: updatedLog,
          mutating: false,
        });
      })
      .addCase(deleteLogEntry.rejected, (state, { payload }) => {
        Object.assign(state, {
          ...state,
          mutating: false,
          error: payload || defaultNetworkErrorMessage,
        });
      });
  },
});

export const dailyLogActions = dailyLog.actions;

export default dailyLog.reducer;

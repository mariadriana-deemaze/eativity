import { createAsyncThunk } from "@reduxjs/toolkit";

import { createEntry, getDailyEntryLogs, updateEntry } from "../../api";

import { PatchMealLogEntry, PostMealLogEntry } from "../../types";

export const getDailyLogs = createAsyncThunk(
  "getDailyLogs",
  async (_, { rejectWithValue }) => {
    try {
      return await getDailyEntryLogs();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

export const createLogEntry = createAsyncThunk(
  "createLogEntry",
  async (entry: PostMealLogEntry, { rejectWithValue }) => {
    try {
      return await createEntry(entry);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

export const updateLogEntry = createAsyncThunk(
  "updateLogEntry",
  // @ts-ignore
  async (id: string, entry: PatchMealLogEntry, { rejectWithValue }) => {
    try {
      return await updateEntry(id, entry);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

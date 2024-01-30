import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDailyEntryLogs,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../../api";

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
    console.log("entry thunk ->", entry);

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
  async (
    { id, entry }: { id: number; entry: PatchMealLogEntry },
    { rejectWithValue }
  ) => {
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

export const deleteLogEntry = createAsyncThunk(
  "deleteLogEntry",
  async (id: number, { rejectWithValue }) => {
    try {
      return await deleteEntry(id);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An error has ocurred!");
      }
    }
  }
);

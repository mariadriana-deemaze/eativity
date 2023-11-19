import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUser, patchUser } from "../../api";

import { User } from "../../../types/user";

export const getUserInfo = createAsyncThunk(
  "getUser",
  async (_user: User, { rejectWithValue }) => {
    try {
      return await getUser();
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "updateUser",
  async (user: User, { rejectWithValue }) => {
    try {
      return await patchUser(user);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
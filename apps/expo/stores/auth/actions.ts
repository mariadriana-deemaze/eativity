import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInUser, signUpUser } from "../../api";

export type SignInInputs = {
  name: string;
  email: string;
  password: string;
};

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
};

export const authenticateUser = createAsyncThunk(
  "auth/signin",
  async ({ name, email, password }: SignInInputs, { rejectWithValue }) => {
    try {
      return await signInUser({
        name,
        email,
        password,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }: SignUpInputs, { rejectWithValue }) => {
    try {
      return await signUpUser({
        name,
        email,
        password,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

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
      const response = await signInUser({
        name,
        email,
        password,
      });

      console.log("response here ->", response);

      return response;
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
      const response = await signUpUser({
        name,
        email,
        password,
      });

      console.log("response here ->", response);

      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

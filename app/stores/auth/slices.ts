import { createSlice } from "@reduxjs/toolkit";

import { registerUser, authenticateUser } from "./actions";

import * as SecureStore from "expo-secure-store";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: SecureStore.getItemAsync("secure_token"),
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userToken = payload.access_token;
        SecureStore.setItemAsync("secure_token", payload.access_token);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(authenticateUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userToken = payload.access_token;
        SecureStore.setItemAsync("secure_token", payload.access_token);
      })
      .addCase(authenticateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { registerUser, authenticateUser } from "./actions";

import * as SecureStore from "expo-secure-store";

import {
  defaultNetworkErrorMessage,
  ToastInfoProps,
} from "../../components/toastAlert";
import { LogBox } from "react-native";

const TOKEN_KEY = "secure_token";
interface InitialState {
  loading: boolean;
  userToken: Promise<string> | string | null;
  error: ToastInfoProps | null;
  success: boolean;
}

const initialState: InitialState = {
  loading: false,
  // userToken: SecureStore.getItemAsync(TOKEN_KEY).then((t) => t),
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      })
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        console.log("authenticateUser payload ->", payload);

        state.loading = false;
        state.success = true;
        state.userToken = payload.access_token;
        if (payload.access_token) {
          SecureStore.setItemAsync(TOKEN_KEY, payload.access_token);
        }
      })
      .addCase(authenticateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      });
  },
});
export default authSlice.reducer;

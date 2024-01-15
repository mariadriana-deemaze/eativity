import { createSlice } from "@reduxjs/toolkit";

import { getUserInfo, updateUserInfo } from "./actions";

import {
  defaultNetworkErrorMessage,
  ToastInfoProps,
} from "../../components/toastAlert";

import { User } from "../../types/user";

interface InitialState {
  loading: boolean;
  user: User | null;
  error: ToastInfoProps | null;
  success: boolean;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload: user }) => {
        state.loading = false;
        state.success = true;
        state.user = user;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload: user }) => {
        state.loading = false;
        state.success = true;
        state.user = user;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = defaultNetworkErrorMessage;
      });
  },
});
export default userSlice.reducer;

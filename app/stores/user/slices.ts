import { createSlice } from "@reduxjs/toolkit";

import { getUserInfo, updateUserInfo } from "./actions";

const initialState = {
  loading: false,
  user: {}, // TODO: Correct types
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
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
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
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default userSlice.reducer;

import axios from "axios";

import { SignInInputs, SignUpInputs } from "../stores/auth/actions";

export const API_URL = "http://192.168.1.66:3000";

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: API_URL,
  headers,
});

export const apiSignInUser = async (params: SignInInputs) =>
  await api
    .post(`${API_URL}/auth/sign-in`, params)
    .then(({ data }) => {
      console.log("data ->", data);
      return data;
    })
    .catch((err) => err);

export const apiSignUpUser = async (
  params: Omit<SignUpInputs, "password_repeat">
) =>
  await api
    .post(`${API_URL}/auth/sign-up`, params)
    .then(({ data }) => {
      console.log("data ->", data);
      return data;
    })
    .catch((err) => err);

export default api;

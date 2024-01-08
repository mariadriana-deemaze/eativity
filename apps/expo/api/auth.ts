import { api, API_URL } from ".";

import { SignInInputs, SignUpInputs } from "../stores/auth/actions";

export const signInUser = async (params: SignInInputs) =>
  await api
    .post(`${API_URL}/auth/sign-in`, params)
    .then(({ data }) => {
      console.log("data ->", data);
      return data;
    })
    .catch((err) => err);

export const signUpUser = async (
  params: Omit<SignUpInputs, "password_repeat">
) =>
  await api
    .post(`${API_URL}/auth/sign-up`, params)
    .then(({ data }) => {
      console.log("data ->", data);
      return data;
    })
    .catch((err) => err);

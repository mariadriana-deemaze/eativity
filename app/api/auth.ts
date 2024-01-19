import { api, API_URL } from "./api";

import { SignInInputs, SignUpInputs } from "../stores/auth/actions";

import { User } from "../types/user";

type SignInUserResponse = { access_token: string };

type SignUpUserResponse = User;

export const signInUser = async (params: SignInInputs) =>
  await api
    .post<SignInUserResponse>(`${API_URL}/auth/sign-in`, params)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });

export const signUpUser = async (
  params: Omit<SignUpInputs, "password_repeat">
) =>
  await api
    .post<SignUpUserResponse>(`${API_URL}/auth/sign-up`, params)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });

import { api, API_URL } from ".";

import { User } from "../../types/user";

export const getUser = async () =>
  await api
    .get(`${API_URL}/users/me`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => err);

export const patchUser = async (user: User) => {
  return await api
    .patch(`${API_URL}/users/me`, user)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => err);
};

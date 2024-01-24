import axios, { AxiosResponse } from "axios";

export const API_URL = "http://10.11.13.17:3000";

import * as SecureStore from "expo-secure-store";

import { TOKEN_KEY } from "../stores/auth/slices";

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

export const api = axios.create({
  baseURL: API_URL,
  headers,
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const API_LOGGER = (req: AxiosResponse<any, any>) => {
  console.log("//////");
  console.log(
    `[LOGGER::${req.config.method.toUpperCase()}::${
      req.config.url
    }] -> ${JSON.stringify(req.data)}`
  );
  console.log("-----");
};

api.interceptors.response.use(
  (fulfilledRequestResponse) => {
    if (process.env.NODE_ENV !== "production")
      API_LOGGER(fulfilledRequestResponse);
    return fulfilledRequestResponse;
  },
  (rejectedRequestResponse) => {
    if (process.env.NODE_ENV !== "production")
      API_LOGGER(rejectedRequestResponse);
    return rejectedRequestResponse;
  }
);

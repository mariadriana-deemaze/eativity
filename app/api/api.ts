import axios, { AxiosResponse } from "axios";

export const API_URL = "http://192.168.1.66:3000";

import * as SecureStore from "expo-secure-store";

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
    const token = await SecureStore.getItemAsync("secure_token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

const API_LOGGER = (req: AxiosResponse<any, any>) => {
  console.log("//////");
  console.log(
    `[LOGGER::${req.config.method.toUpperCase()}::${
      req.config.url
    }] -> ${JSON.stringify(req.data)}`,
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
  },
);

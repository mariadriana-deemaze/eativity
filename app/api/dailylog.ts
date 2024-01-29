/* eslint-disable @typescript-eslint/no-unused-vars */
import { api, API_URL } from "./api";

import { Meal, MealLog, PatchMealLogEntry, PostMealLogEntry } from "../types";

const url = `${API_URL}/daily-log`;

const formatPayload = (entry: PostMealLogEntry | PatchMealLogEntry) => {
  const formatted: PostMealLogEntry | PatchMealLogEntry = {
    type: entry.type,
    quantity: Number(entry.quantity),
    foodId: Number(entry.foodId),
  };

  return formatted;
};

export const getDailyEntryLogs = async () => {
  return await api.get(url).then(({ data }) => data);
};

export const createEntry = async (entry: PostMealLogEntry) => {
  console.log("entry ->", entry);

  const newEntry = formatPayload(entry);

  return await api
    .post(url, newEntry)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data as MealLog;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateEntry = (id: string, entry: PatchMealLogEntry) => {
  //
  // URL = `${API_URL}/me/dailylog/entry/${id}`,
  // update resource
  // entry.id;
  // api.patch
};

export const deleteEntry = async (entryId: string) => {
  return await api
    .delete(`${url}/${entryId}`)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data as Meal;
    })
    .catch((err) => {
      throw new Error(err);
    });
  //
  // URL = `${API_URL}/me/dailylog/entry/${id}`,
  // update resource
  // entry.id;
  // api.patch
};

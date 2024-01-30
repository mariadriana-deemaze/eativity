import { api, API_URL } from "./api";

import { MealLog, PatchMealLogEntry, PostMealLogEntry } from "../types";

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

export const updateEntry = async (
  entryId: number,
  entry: PatchMealLogEntry
) => {
  console.log("entry ->", entry);

  const newEntry = formatPayload(entry);

  return await api
    .patch(`${url}/${entryId}`, { quantity: newEntry.quantity })
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data as MealLog;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const deleteEntry = async (entryId: number) => {
  return await api
    .delete(`${url}/${entryId}`)
    .then((resp) => {
      console.log("API resp ->", resp);
      const { data } = resp;
      return data as MealLog;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

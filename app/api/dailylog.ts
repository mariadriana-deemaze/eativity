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
  return await api.get<MealLog[]>(url).then(({ data }) => data);
};

export const createEntry = async (entry: PostMealLogEntry) => {
  const newEntry = formatPayload(entry);

  return await api
    .post<MealLog>(url, newEntry)
    .then((resp) => {
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateEntry = async (
  entryId: number,
  entry: PatchMealLogEntry
) => {
  const newEntry = formatPayload(entry);

  return await api
    .patch<MealLog>(`${url}/${entryId}`, { quantity: newEntry.quantity })
    .then((resp) => {
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const deleteEntry = async (entryId: number) => {
  return await api
    .delete<MealLog>(`${url}/${entryId}`)
    .then((resp) => {
      const { data } = resp;
      return data;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// import { api, API_URL } from "./api";

import { MealLog, PatchMealLogEntry, PostMealLogEntry } from "../types";

export const getDailyEntryLogs = () => {
  // api.get
  // URL = `${API_URL}/me/dailylog`,
};

export const createEntry = (entry: PostMealLogEntry) => {
  // api.post
  // URL = `${API_URL}/me/dailylog/entry`,
};

export const updateEntry = (id: string, entry: PatchMealLogEntry) => {
  //
  // URL = `${API_URL}/me/dailylog/entry/${id}`,
  // update resource
  // entry.id;
  // api.patch
};

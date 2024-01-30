export interface CompactRecord {
  id: number;
}

export interface Record extends CompactRecord {
  createdAt: string;
  updatedAt: string;
}

export interface NutrionalValues {
  calories: number;
  carbohydrate: number;
  fat: number;
  protein: number;
}

export type PaginatedPayload<T> = {
  data: T[];
  pagination: {
    count: number;
    offset: number;
    maxResults: number;
  };
};

export type PaginationParameters = {
  offset: number;
  maxResults: number;
};

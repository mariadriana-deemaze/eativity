import { Record } from "./shared";

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export interface Image extends Record {
  type: MediaType;
  path: string;
}

import { Image } from ".";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum MeasurementUnit {
  IMPERIAL = "IMPERIAL",
  METRIC = "METRIC",
}

export type User = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  createdAt: Date;
  updatedAt: Date;
  measurementUnit: MeasurementUnit;
  birthdate: Date | null;
  gender: Gender | null;
  height: number | null;
  weight?: number | null;
  image?: Image;
};

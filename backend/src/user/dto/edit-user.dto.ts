import { Gender, Goal, GoalDiff, MeasurementUnit } from "@prisma/client";

import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  gender?: Gender;

  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsOptional()
  measurementUnit?: MeasurementUnit;

  @IsOptional()
  plan?: {
    goal?: Goal;
    goal_diff?: GoalDiff;
    weekly_training_amount?: number;
    average_minutes_per_training_session?: number;
  };
}

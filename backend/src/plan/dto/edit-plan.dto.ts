import { Goal, GoalDiff } from "@prisma/client";
import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator";

export class EditPlanDto {
  @IsString()
  @IsEnum(Goal)
  @IsOptional()
  goal?: Goal;

  @IsString()
  @IsEnum(GoalDiff)
  @IsOptional()
  goal_diff?: GoalDiff;

  @IsNumber()
  @IsOptional()
  weekly_training_amount?: number;

  @IsNumber()
  @IsOptional()
  average_minutes_per_training_session?: number;
}

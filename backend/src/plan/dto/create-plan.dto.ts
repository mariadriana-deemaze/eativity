import { Goal, GoalDiff } from "@prisma/client";
import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";

export class CreatePlanDto {
  @IsString()
  @IsEnum(Goal)
  @IsNotEmpty()
  goal: Goal;

  @IsString()
  @IsEnum(GoalDiff)
  @IsNotEmpty()
  goal_diff: GoalDiff;

  @IsNumber()
  @IsNotEmpty()
  weekly_training_amount: number;

  @IsNumber()
  @IsNotEmpty()
  average_minutes_per_training_session: number;
}

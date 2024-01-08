import { Gender, Goal, GoalDiff, MeasurementUnit } from "@prisma/client";
export declare class EditUserDto {
    email?: string;
    name?: string;
    gender?: Gender;
    birthdate?: Date;
    height?: number;
    weight?: number;
    measurementUnit?: MeasurementUnit;
    plan?: {
        goal?: Goal;
        goal_diff?: GoalDiff;
        weekly_training_amount?: number;
        average_minutes_per_training_session?: number;
    };
}

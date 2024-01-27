import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Food, MealLogType } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { startOfToday, endOfToday, isToday, sub, format } from "date-fns";

import { CreateLogDto, EditLogDto } from "./dto";

import { sortObjectByEnumOrder } from "../../utils";

import { DaysOfWeek, FoodLogRecord, TotalIntakes } from "../../types";


@Injectable()
export class DailyLogService {
  constructor(private prisma: PrismaService) {}

  /* 
  Get all entries from the current day
   */
  async getAllDailyEntries(
    userId: number
  ): Promise<Record<keyof MealLogType, FoodLogRecord[]>> {
    // Retrieve all logs
    const logs = await this.prisma.mealLog.findMany({
      where: {
        userId,
        createdAt: {
          gt: startOfToday(),
          lt: endOfToday(),
        },
      },
      include: {
        food: true,
      },
    });

    // Group results by `MealLogType`
    const results = logs.reduce((acc, item) => {
      const key = item.type;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    }, {} as Record<keyof MealLogType, FoodLogRecord[]>);

    // Sort logs types by the `MealLogType` enum order
    const sortedResults = sortObjectByEnumOrder(MealLogType, results) as Record<
      keyof MealLogType,
      FoodLogRecord[]
    >;

    return sortedResults;
  }

  /* 
  Create daily entry
   */
  async createDailyEntry(userId, { foodId, quantity, type }: CreateLogDto) {
    return await this.prisma.mealLog.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        food: {
          connect: {
            id: foodId,
          },
        },
        quantity,
        type,
      },
    });
  }

  /* 
  Updates daily entry
   */
  async updateDailyEntry(entryId: number, { quantity }: EditLogDto) {
    const allowDelete = await this.isRecordFromToday(entryId);

    if (!allowDelete)
      throw new ForbiddenException(
        "You can't edit a record that is not from today."
      );

    return await this.prisma.mealLog.update({
      where: { id: entryId },
      data: {
        quantity,
      },
    });
  }

  /* 
  Deletes daily entry
   */
  async deleteDailyEntry(entryId: number) {
    const allowDelete = await this.isRecordFromToday(entryId);

    if (!allowDelete)
      throw new ForbiddenException(
        "You can't delete a record that is not from today."
      );

    return await this.prisma.mealLog.delete({
      where: { id: entryId },
    });
  }

  async getUserWeeklySummary(userId: number) {
    const today = new Date();
    const sevenDaysAgo = sub(today, { days: 7 });

    const userLogs: FoodLogRecord[] = await this.prisma.mealLog.findMany({
      where: {
        userId,
        createdAt: {
          gt: sevenDaysAgo,
          lt: today,
        },
      },
      include: {
        food: true,
      },
    });

    // sort food records per day of the week
    const sorted: Record<DaysOfWeek, Food[]> = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    for (const key in userLogs) {
      const userLogRecord: FoodLogRecord = userLogs[key];

      const recordDayOfWeek = format(
        userLogRecord.createdAt,
        "eeee"
      ).toLowerCase() as DaysOfWeek;

      sorted[recordDayOfWeek].push(userLogRecord.food);
    }

    // reduce daily intakes
    const weeklyIntakesCounter: Record<DaysOfWeek, TotalIntakes> = {
      monday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      tuesday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      wednesday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      thursday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      friday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      saturday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
      sunday: { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
    };

    Object.entries(sorted).forEach(([dayOfWeek, foods]) => {
      const dailySummedIntakes: TotalIntakes = foods.reduce(
        (acc, obj) => {
          acc.calories += obj.calories;
          acc.proteins += obj.proteins;
          acc.carbohydrates += obj.carbohydrates;
          acc.fats += obj.fats;
          return acc;
        },
        { calories: 0, proteins: 0, fats: 0, carbohydrates: 0 }
      );

      weeklyIntakesCounter[dayOfWeek] = dailySummedIntakes;
    });

    return weeklyIntakesCounter;
  }

  /**
   *
   * Guards records as to be only edited if the `createdAt` field matches the current day.
   */

  async isRecordFromToday(entryId: number) {
    const record = await this.prisma.mealLog.findUnique({
      where: { id: entryId },
    });

    if (record === null) throw new NotFoundException();

    return isToday(new Date(record.createdAt));
  }
}

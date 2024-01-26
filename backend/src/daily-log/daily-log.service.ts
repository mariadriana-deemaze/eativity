import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Food, MealLog, MealLogType } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { startOfToday, endOfToday, isToday, sub, format } from "date-fns";

import { CreateLogDto, EditLogDto } from "./dto";

import { sortObjectByEnumOrder, uniq } from "../../utils";

import { DaysOfWeek } from "../../types";

type LogEntry = {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: MealLogType;
  quantity: number;
  food: Food;
};

@Injectable()
export class DailyLogService {
  constructor(private prisma: PrismaService) {}

  /* 
  Get all entries from the current day
   */
  async getAllDailyEntries(
    userId: number
  ): Promise<Record<keyof MealLogType, LogEntry[]>> {
    // Retrieve all logs
    const logs = await this.prisma.mealLog.findMany({
      where: {
        userId,
        createdAt: {
          gt: startOfToday(),
          lt: endOfToday(),
        },
      },
    });

    // Map all unique foodsIds
    const foodsIds = uniq(logs.map((entry) => entry.foodId));

    // Retrieve all foods from the logs
    const foods = await this.prisma.food.findMany({
      where: { id: { in: foodsIds } },
    });

    // Group results by `MealLogType` and with the `Food` record
    const results = logs.reduce((acc, item) => {
      const key = item.type;

      const foodIndex = foods.findIndex((food) => food.id === item.foodId);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type: item.type,
        quantity: item.quantity,
        food: foods[foodIndex],
      });

      return acc;
    }, {} as Record<keyof MealLogType, LogEntry[]>);

    // Sort logs types by the `MealLogType` enum order
    const sortedResults = sortObjectByEnumOrder(MealLogType, results) as Record<
      keyof MealLogType,
      LogEntry[]
    >;

    return sortedResults;
  }

  /* 
  Create daily entry
   */
  async createDailyEntry(userId, { foodId, quantity, type }: CreateLogDto) {
    return await this.prisma.mealLog.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        Food: {
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

    const userLogs = await this.prisma.mealLog.findMany({
      where: {
        userId,
        createdAt: {
          gt: sevenDaysAgo,
          lt: today,
        },
      },
    });

    const results: Record<DaysOfWeek, MealLog[]> = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    for (const key in userLogs) {
      const userLogRecord: MealLog = userLogs[key];

      const recordDayOfWeek = format(
        userLogRecord.createdAt,
        "eeee"
      ).toLowerCase() as DaysOfWeek;

      results[recordDayOfWeek].push(userLogRecord);
    }

    return results;
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

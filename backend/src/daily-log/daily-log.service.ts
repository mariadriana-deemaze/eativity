import { Injectable } from "@nestjs/common";

import { Food, MealLogType } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { startOfToday, endOfToday } from "date-fns";

import { CreateLogDto, EditLogDto } from "./dto";

import { sortObjectByEnumOrder, uniq } from "utils";

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
    return await this.prisma.mealLog.delete({
      where: { id: entryId },
    });
  }
}

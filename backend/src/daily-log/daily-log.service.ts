import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { startOfToday, endOfToday } from "date-fns";

@Injectable()
export class DailyLogService {
  constructor(private prisma: PrismaService) {}

  /* 
  Get all entries from the current day
   */
  async getAllDailyEntries(userId: number) {
    return await this.prisma.mealLog.findMany({
      where: {
        userId,
        createdAt: {
          gt: startOfToday(),
          lt: endOfToday(),
        },
      },
    });
  }

  /* 
  Create daily entry
   */
  async createDailyEntry(userId: number, entry: Prisma.MealLogCreateInput) {
    return await this.prisma.mealLog.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        ...entry,
      },
    });
  }

  /* 
  Updates daily entry
   */
  async updateDailyEntry(entryId: number, entry: Prisma.MealLogUpdateInput) {
    return await this.prisma.mealLog.update({
      where: { id: entryId },
      data: entry,
    });
  }
}

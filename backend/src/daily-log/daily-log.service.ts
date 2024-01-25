import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

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
          in: new Date().toISOString(),
        },
      },
    });
  }

  /* 
  Create daily entry
   */
  async createDailyEntry(userId: number, entry: Prisma.MealLogCreateInput) {
    // WIP
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return await this.prisma.mealLog.create({
      data: {
        User: user,
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

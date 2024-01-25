import { Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { DailyLogService } from "./daily-log.service";
import { Prisma, User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";

@UseGuards(JwtGuard)
@Controller("daily-log")
export class DailyLogController {
  constructor(private dailyLogService: DailyLogService) {}

  @Get()
  async getDailyEntries(@GetUser() { id }: User) {
    return await this.dailyLogService.getAllDailyEntries(id);
  }

  @Post()
  async createLogEntry(userId, entry: Prisma.MealLogCreateInput) {
    return await this.dailyLogService.createDailyEntry(userId, entry);
  }

  @Patch()
  async updateLogEntry(userId, entry: Prisma.MealLogUpdateInput) {
    return await this.dailyLogService.updateDailyEntry(userId, entry);
  }
}

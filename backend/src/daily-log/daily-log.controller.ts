import {
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  Body,
  Param,
  Delete,
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { DailyLogService } from "./daily-log.service";
import { User } from "@prisma/client";
import { GetUser } from "../auth/decorator";
import { CreateLogDto } from "./dto/create-log.dto";
import { EditLogDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("daily-log")
export class DailyLogController {
  constructor(private dailyLogService: DailyLogService) {}

  @Get()
  async getDailyEntries(@GetUser() { id }: User) {
    return await this.dailyLogService.getAllDailyEntries(id);
  }

  @Post()
  async createLogEntry(
    @GetUser() { id }: User,
    @Body() createLogDto: CreateLogDto
  ) {
    return await this.dailyLogService.createDailyEntry(id, createLogDto);
  }

  @Patch(":id")
  async updateLogEntry(
    @Param() { id }: { id: string },
    @Body() editLogDto: EditLogDto
  ) {
    return await this.dailyLogService.updateDailyEntry(
      parseInt(id),
      editLogDto
    );
  }

  @Delete(":id")
  async deleteLogEntry(@Param() { id }: { id: string }) {
    return await this.dailyLogService.deleteDailyEntry(parseInt(id));
  }
}

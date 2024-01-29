import { Module } from "@nestjs/common";
import { DailyLogService } from "./daily-log.service";
import { DailyLogController } from "./daily-log.controller";

@Module({
  controllers: [DailyLogController],
  providers: [DailyLogService],
  exports: [DailyLogService],
})
export class DailyLogModule {}

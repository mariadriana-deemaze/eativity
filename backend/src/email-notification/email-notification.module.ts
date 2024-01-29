import { Module } from "@nestjs/common";

import { EmailNotificationService } from "./email-notification.service";

import { UserService } from "../user/user.service";

import { DailyLogService } from "../daily-log/daily-log.service";

@Module({
  providers: [EmailNotificationService, DailyLogService, UserService],
})
export class EmailNotificationModule {}

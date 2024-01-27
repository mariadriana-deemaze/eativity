import { Injectable, Logger } from "@nestjs/common";

import { MailerService } from "@nestjs-modules/mailer";

import { Cron } from "@nestjs/schedule";

import { render } from "@react-email/render";

import { UserService } from "../user/user.service";

import { DailyLogService } from "../daily-log/daily-log.service";

import { UserWeeklySummaryEmail } from "../../templates/userWeeklySummary";

enum CustomScheduleExpression {
  EVERY_SUNDAY_AT_MIDNIGHT = "0 0 * * 0",
  __TEST___CURRENT_SECOND_IS_5 = "5 * * * * *",
}

@Injectable()
export class EmailNotificationService {
  constructor(
    private userService: UserService,
    private dailyLogService: DailyLogService,
    private mailerService: MailerService
  ) {}

  private readonly logger = new Logger(EmailNotificationService.name);

  @Cron(CustomScheduleExpression.EVERY_SUNDAY_AT_MIDNIGHT)
  async usersWeeklySummary() {
    const users = await this.userService.getAll();

    for (const index in users) {
      const user = users[index];

      const userLogs = await this.dailyLogService.getUserWeeklySummary(user.id);

      const html = render(
        UserWeeklySummaryEmail({
          name: user.name,
          email: user.email,
          weeklyMacros: userLogs,
        })
      );

      await this.mailerService.sendMail({
        to: user.email,
        from: "info@eativity.com",
        subject: `Your weekly review ${user.name}`,
        html,
      });
    }

    this.logger.log(
      `Finished sending the summary e-mail to ${users.length} users.`
    );
  }
}

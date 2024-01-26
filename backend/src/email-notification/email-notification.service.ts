import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);

  @Cron("45 * * * * *")
  handleCron() {
    this.logger.debug("Called when the current second is 45");
  }
}

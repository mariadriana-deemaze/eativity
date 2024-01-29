import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";

import { AuthService } from "./auth.service";

import { JwtStrategy } from "./strategy/jwt.strategy";

import { EmailNotificationService } from "../email-notification/email-notification.service";

import { UserModule } from "../user/user.module";

import { DailyLogModule } from "../daily-log/daily-log.module";

@Module({
  imports: [JwtModule.register({}), UserModule, DailyLogModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailNotificationService],
})
export class AuthModule {}

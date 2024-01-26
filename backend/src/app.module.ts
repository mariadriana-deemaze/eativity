import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { ScheduleModule } from "@nestjs/schedule";

import { MailerModule } from "@nestjs-modules/mailer";

import { DevtoolsModule } from "@nestjs/devtools-integration";

import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

import { FoodModule } from "./food/food.module";

import { RecipeModule } from "./recipe/recipe.module";

import { DailyLogModule } from "./daily-log/daily-log.module";

import { EmailNotificationModule } from "./email-notification/email-notification.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    MailerModule.forRoot({
      transport: {
        host: "localhost",
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    PrismaModule,
    FoodModule,
    RecipeModule,
    DailyLogModule,
    EmailNotificationModule,
  ],
})
export class AppModule {}

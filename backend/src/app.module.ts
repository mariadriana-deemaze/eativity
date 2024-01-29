import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { ScheduleModule } from "@nestjs/schedule";

import { MailerModule } from "@nestjs-modules/mailer";

import { DevtoolsModule } from "@nestjs/devtools-integration";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

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
    EmailNotificationModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

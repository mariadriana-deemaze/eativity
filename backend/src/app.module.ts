import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { MailerModule } from "@nestjs-modules/mailer";

import { CacheModule } from "@nestjs/cache-manager";

import { DevtoolsModule } from "@nestjs/devtools-integration";

import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

import { FatSecretModule } from "./fat-secret/fat-secret.module";

import { NO_REPLY_EMAIL_SENDER } from "utils";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    CacheModule.register({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: "localhost",
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: `"No Reply" <${NO_REPLY_EMAIL_SENDER}>`,
      },
      preview: true,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    FatSecretModule,
  ],
})
export class AppModule {}

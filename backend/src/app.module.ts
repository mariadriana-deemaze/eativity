import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { MailerModule } from "@nestjs-modules/mailer";

import { DevtoolsModule } from "@nestjs/devtools-integration";

import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

import { FoodModule } from "./food/food.module";

import { RecipeModule } from "./recipe/recipe.module";
import { DailyLogController } from './daily-log/daily-log.controller';
import { DailyLogService } from './daily-log/daily-log.service';
import { DailyLogModule } from './daily-log/daily-log.module';

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
    UserModule,
    AuthModule,
    PrismaModule,
    FoodModule,
    RecipeModule,
    DailyLogModule,
  ],
  controllers: [DailyLogController],
  providers: [DailyLogService],
})
export class AppModule {}

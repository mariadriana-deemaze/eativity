import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { MailerModule } from "@nestjs-modules/mailer";

import { DevtoolsModule } from "@nestjs/devtools-integration";

import { PrismaModule } from "./prisma/prisma.module";

import { AuthModule } from "./auth/auth.module";

import { UserModule } from "./user/user.module";

import { FoodModule } from "./food/food.module";

import { RecipeModule } from "./recipe/recipe.module";

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
  ],
})
export class AppModule {}

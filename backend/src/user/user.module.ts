import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";

import { UserService } from "./user.service";

import { FoodModule } from "../food/food.module";

import { RecipeModule } from "../recipe/recipe.module";

import { PlanModule } from "../plan/plan.module";

import { WeightModule } from "../weight/weight.module";

import { PrismaModule } from "../prisma/prisma.module";

import { DailyLogModule } from "../daily-log/daily-log.module";

@Module({
  imports: [
    FoodModule,
    RecipeModule,
    PlanModule,
    WeightModule,
    PrismaModule,
    DailyLogModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

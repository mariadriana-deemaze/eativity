import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";

import { UserService } from "./user.service";

import { WeightController } from "./../weight/weight.controller";

import { WeightService } from "./../weight/weight.service";

import { PlanService } from "./../plan/plan.service";

import { PlanController } from "./../plan/plan.controller";

import { FoodModule } from "../food/food.module";

import { RecipeModule } from "../recipe/recipe.module";

@Module({
  imports: [FoodModule, RecipeModule],
  controllers: [UserController, WeightController, PlanController],
  providers: [UserService, WeightService, PlanService],
})
export class UserModule {}

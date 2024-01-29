import {
  Controller,
  Body,
  Delete,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { UserService } from "./user.service";

import { FoodService } from "../food/food.service";

import { RecipeService } from "../recipe/recipe.service";

import { WeightService } from "../weight/weight.service";

import { PlanService } from "../plan/plan.service";

import { JwtGuard } from "../auth/guard";

import { User, User as UserModel, Prisma } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private weightService: WeightService,
    private planService: PlanService,
    private foodService: FoodService,
    private recipeService: RecipeService
  ) {}

  @Get("me")
  async getMe(@GetUser() user: User) {
    const where: Prisma.WeightWhereInput = { userId: user.id };

    const latestWeightRecord = await this.weightService.getLatestWeight(where);

    const response: User & { weight?: number } = {
      ...user,
    };

    if (latestWeightRecord) {
      response.weight = latestWeightRecord.weight;
    }

    return response;
  }

  @Patch("me")
  async editUser(
    @GetUser() { id }: User,
    @Body()
    userData: Prisma.UserUpdateInput
  ): Promise<UserModel> {
    return this.userService.editUser({
      where: { id },
      // @ts-ignore
      data: {
        ...userData,
        height: Number(userData.height),
        // @ts-ignore
        password_hash: userData.password,
      },
    });
  }

  // Delete user
  @Delete("me")
  async deleteUser(@GetUser() { id }: User): Promise<UserModel> {
    // Delete the related records in the Weight table
    await this.weightService.deleteUserWeights({
      where: {
        id,
      },
    });

    // Delete the related records in the Plans table
    await this.planService.deleteUserPlan({
      where: {
        id,
      },
    });

    // Finally delete the user record
    return this.userService.deleteUser({
      where: { id },
    });
  }

  @Get("me/foods")
  async getUserFoods(@GetUser() { id }: User) {
    return await this.foodService.getMany({ where: { userId: id } });
  }

  @Get("me/recipes")
  async getUserRecipes(@GetUser() { id }: User) {
    return await this.recipeService.getMany({ where: { userId: id } });
  }
}

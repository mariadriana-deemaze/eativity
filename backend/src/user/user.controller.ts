import { UserService } from "./user.service";

import { WeightService } from "../weight/weight.service";

import { PlanService } from "../plan/plan.service";

import {
  Controller,
  Body,
  Delete,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User, User as UserModel, Prisma } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private weightService: WeightService,
    private planService: PlanService
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
    @GetUser() user: User,
    @Body()
    userData: Prisma.UserUpdateInput
  ): Promise<UserModel> {
    return this.userService.editUser({
      where: { id: user.id },
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
  async deleteUser(@GetUser() user: User): Promise<UserModel> {
    // Delete the related records in the Weight table
    await this.weightService.deleteUserWeights({
      where: {
        id: user.id,
      },
    });

    // Delete the related records in the Plans table
    await this.planService.deleteUserPlans({
      where: {
        id: user.id,
      },
    });

    // Finally delete the user record
    return this.userService.deleteUser({
      where: { id: user.id },
    });
  }
}

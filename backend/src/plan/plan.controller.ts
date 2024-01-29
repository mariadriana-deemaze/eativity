import { PlanService } from "./plan.service";

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";

import { CreatePlanDto, EditPlanDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("plans")
export class PlanController {
  constructor(private planService: PlanService) {}

  @Get()
  async getPlan(@GetUser() user: User) {
    return this.planService.getUserPlan(user);
  }

  @Post()
  async createPlan(@GetUser() user: User, @Body() plan: CreatePlanDto) {
    return this.planService.createUserPlan(user, plan);
  }

  @Patch()
  async editPlan(@GetUser() user: User, @Body() plan: EditPlanDto) {
    return this.planService.editUserPlan(user, plan);
  }

  @Delete()
  async deletePlans(@GetUser() user: User) {
    // Delete the related records in the Plans table
    return this.planService.deleteUserPlan({
      where: { id: user.id },
    });
  }
}

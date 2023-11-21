import { PlanService } from "./plan.service";

import { Controller, Delete, UseGuards } from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("plans")
export class PlanController {
  constructor(private planService: PlanService) {}

  // Delete plans
  @Delete()
  async deletePlans(@GetUser() user: User) {
    // Delete the related records in the Plans table
    return this.planService.deleteUserPlans({
      where: { id: user.id },
    });
  }
}

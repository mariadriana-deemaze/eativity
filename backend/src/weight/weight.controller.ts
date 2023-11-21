import { WeightService } from "./weight.service";

import {
  Controller,
  Delete,
  Get,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User, Weight } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("weight")
export class WeightController {
  constructor(private weightService: WeightService) {}

  @Get('/latest')
  async getLatestWeight(@GetUser() user: User): Promise<Weight> {
    // Get latest inserted record of a user weight
    return this.weightService.getLatestWeight({ id: user.id });
  }

  // Delete weights
  @Delete()
  async deleteWeights(@GetUser() user: User) {
    // Delete the related records in the Weight table
    return this.weightService.deleteUserWeights({
      where: { id: user.id },
    });
  }
}

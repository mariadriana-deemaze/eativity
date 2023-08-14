import { WeightService } from "./weight.service";

import {
  Controller,
  Delete,
  UseGuards,
} from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("weight")
export class WeightController {
  constructor(private weightService: WeightService) {}

  // Delete weights
  @Delete()
  async deleteWeights(@GetUser() user: User): Promise<any> {
    // Delete the related records in the Weight table
    return this.weightService.deleteUserWeights({
      where: { id: user.id },
    });
  }
}

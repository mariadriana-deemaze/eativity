import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { Prisma } from "@prisma/client";

import { JwtGuard } from "../auth/guard";

import { FoodService } from "./food.service";

import { FoodDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("food")
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get("search?")
  async getFoodsBySearchString(
    @Query("name") name: string,
    @Body() { offset, maxResults }: { offset?: string; maxResults?: string }
  ) {
    return this.foodService.getFoodsBySearch({ name, offset, maxResults });
  }

  @Get(":id")
  async getFoodBySearchId(@Param() { id }: { id: string }) {
    return this.foodService.getFoodById({ id: parseInt(id) });
  }

  @Post()
  async createFood(@Body() foodDto: FoodDto) {
    return this.foodService.create(foodDto);
  }

  @Patch(":id")
  async editFood(
    @Param() { id }: { id: string },
    @Body() food: Prisma.FoodUpdateInput
  ) {
    return this.foodService.edit({ id: parseInt(id), food });
  }
}

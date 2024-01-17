import { Body, Controller, Get, Param, Query, UseGuards } from "@nestjs/common";

import { JwtGuard } from "src/auth/guard";

import { FoodService } from "./food.service";

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
}

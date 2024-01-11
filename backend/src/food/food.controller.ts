import { Body, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { FoodService } from "./food.service";

interface PaginatedParams {
  offset?: number;
  maxResults?: number;
}

import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller("food")
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get("search?")
  async getFoodBySearchString(
    @Query("name") query: string,
    @Body() { maxResults, offset }: PaginatedParams
  ) {
    return this.foodService.getFoodBySearch({ query, maxResults, offset });
  }

  // TODO
  /* @Get("food/:id")
  async getFoodBySearchId(@Param() { id }: { id: string }) {
    return this.foodService.getFoodFromFatSecretBySearchId({ id });
  } */
}

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

import { JwtGuard } from "./../auth/guard";

import { RecipeService } from "./recipe.service";

import { RecipeDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("recipe")
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get("search?")
  async getRecipesBySearchString(
    @Query("name") name: string,
    @Body() { offset, maxResults }: { offset?: string; maxResults?: string }
  ) {
    return this.recipeService.getRecipesBySearch({ name, offset, maxResults });
  }

  @Get(":id")
  async getRecipeBySearchId(@Param() { id }: { id: string }) {
    return this.recipeService.getRecipeById({ id: parseInt(id) });
  }

  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeService.create(recipeDto);
  }

  @Patch(":id")
  async editFood(
    @Param() { id }: { id: string },
    @Body() recipeDto: RecipeDto
  ) {
    return this.recipeService.edit({ id: parseInt(id), recipeDto });
  }
}

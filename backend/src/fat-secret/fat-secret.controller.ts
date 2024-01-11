import { FatSecretService } from "./fat-secret.service";
import { Controller, Get, Param, Query /* UseGuards */ } from "@nestjs/common";
// import { JwtGuard } from "../auth/guard";

// @UseGuards(JwtGuard)
@Controller("fat-secret")
export class FatSecretController {
  constructor(private fatSecretService: FatSecretService) {}

  @Get("food/search?")
  async getFoodBySearchString(@Query("name") query) {
    return this.fatSecretService.getFoodFromFatSecretBySearchString({ query });
  }

  @Get("food/:id")
  async getFoodBySearchId(@Param() { id }: { id: string }) {
    return this.fatSecretService.getFoodFromFatSecretBySearchId({ id });
  }

  @Get("recipe/search?")
  async getRecipesBySearchString(@Query("name") query) {
    return this.fatSecretService.getRecipesFromFatSecretBySearchString({
      query,
    });
  }

  @Get("recipe/:id")
  async getRecipesBySearchId(@Param() { id }: { id: string }) {
    return this.fatSecretService.getRecipesFromFatSecretBySearchId({
      id,
    });
  }

  @Get("recipe-types")
  async getRecipesTypes() {
    return this.fatSecretService.getRecipesTypesFromFatSecret();
  }
}

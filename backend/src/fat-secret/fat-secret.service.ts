import { Inject, Injectable } from "@nestjs/common";

import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { FatSecret } from "./fat-secret";

import { ConfigService } from "@nestjs/config";

import { Cache } from "cache-manager";

import { PrismaService } from "src/prisma/prisma.service";

import { URLSearchParams } from "url";

import {
  FatSecretFoodsPage,
  FatSecretRecipesPage,
  FatSecretApiTokenResponse,
  FatSecretRecipeTypes,
} from "types";

import { FAT_SECRET_OAUTH_ENDPOINT } from "utils";

@Injectable()
export class FatSecretService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  static get API() {
    return new FatSecret(process.env.FAT_SECRET_1_CONSUMER_KEY);
  }
  
  async getAppToken() {
    const user: string = this.config.get("FAT_SECRET_ID");
    const password: string = this.config.get("FAT_SECRET_CONSUMER_SECRET");
    const authorization: string = `Basic ${btoa(`${user}:${password}`)}`;

    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("scope", "basic");

    return fetch(FAT_SECRET_OAUTH_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data: FatSecretApiTokenResponse) => {
        console.log("data ->", data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async getFoodFromFatSecretBySearchString({ query }: { query: string }) {
    // Get from cache
    const SHARED_SECRET: string | undefined = await this.cacheManager.get(
      "access_token"
    );

    return FatSecretService.API.request<FatSecretFoodsPage>({
      method: "foods.search",
      search_expression: query,
      access_token: SHARED_SECRET,
      //max_results: 1,
    });

    // get some from the app db
    // TODO: Food service
    // Get food by search string
    // https://platform.fatsecret.com/docs/v1/foods.search
  }

  async getFoodFromFatSecretBySearchId({ id }: { id: string }) {
    return FatSecretService.API.request<FatSecretFoodsPage>({
      method: "food.get",
      search_expression: id,
      //max_results: 1,
    });
  }

  async getRecipesFromFatSecretBySearchString({ query }: { query: string }) {
    return FatSecretService.API.request<FatSecretRecipesPage>({
      method: "recipes.search",
      search_expression: query,
      //max_results: 1,
    });
  }

  async getRecipesFromFatSecretBySearchId({ id }: { id: string }) {
    return FatSecretService.API.request<FatSecretRecipesPage>({
      method: "recipe.get",
      search_expression: id,
      //max_results: 1,
    });
  }

  async getRecipesTypesFromFatSecret() {
    return FatSecretService.API.request<FatSecretRecipeTypes>({
      method: "recipe_types.get",
      //search_expression: id,
      //max_results: 1,
    });
  }
}

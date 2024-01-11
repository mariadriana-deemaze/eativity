import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, /* Food */ } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Cache } from "cache-manager";
import { FatSecret } from "src/fat-secret/fat-secret";
import { PrismaService } from "src/prisma/prisma.service";
import {
  /* FatSecretFood, */
  FatSecretFoodsPage,
  IntegratedFatSecretMethods,
} from "types";

@Injectable()
export class FoodService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  static get FatSecretAPI() {
    return new FatSecret(process.env.FAT_SECRET_CONSUMER_KEY);
  }

  // TODO: Review how to serialize and upload image
  // https://linear.app/eativity/issue/EAT-36/implement-file-uploading-for-foods
  serializeFatSecretFoodResult(/* food: FatSecretFood */) {
    /* const serialized: Food = {
        id:,
        name:food.food_name,
    };
    return serialized; */
  }

  async getFoodBySearch({
    query,
    offset,
    maxResults,
  }: {
    query: string;
    offset?: number;
    maxResults?: number;
  }) {
    // Get FAT SECRET api from cache
    const SHARED_SECRET: string | undefined = await this.cacheManager.get(
      "access_token"
    );

    let prismaSearchParams: Prisma.FoodFindManyArgs<DefaultArgs> = {
      where: {
        name: {
          contains: query,
        },
      },
    };

    let normalizedOffset = null;
    let normalizedMaxResults = null;

    if (offset && maxResults) {
      // get half only - as to join the results between DB and API
      normalizedOffset = offset / 2;
      normalizedMaxResults = maxResults / 2;

      prismaSearchParams = {
        ...prismaSearchParams,
        skip: normalizedOffset,
        take: normalizedMaxResults,
      };
    }

    const foodsSearch = await this.prisma.food.findMany(prismaSearchParams);

    const foodsFromFatSecret =
      await FoodService.FatSecretAPI.request<FatSecretFoodsPage>({
        method: IntegratedFatSecretMethods.FOODS_SEARCH,
        search_expression: query,
        access_token: SHARED_SECRET,
        max_results: normalizedMaxResults,
        page_number: normalizedOffset,
      });

    const results = [...foodsSearch, ...foodsFromFatSecret.foods.food];

    console.log("results", results);

    return results;
  }
}

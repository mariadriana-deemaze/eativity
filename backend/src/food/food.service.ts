import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { FoodDto } from "./dto";

@Injectable()
export class FoodService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  private readonly logger = new Logger(FoodService.name);

  async getFoodsBySearch({
    name,
    offset,
    maxResults,
  }: {
    name: string;
    offset?: string;
    maxResults?: string;
  }) {
    const query: Prisma.FoodFindManyArgs = {
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset && parseInt(offset),
      take: maxResults && parseInt(maxResults),
      orderBy: { createdAt: "desc" },
    };

    const [results, count] = await this.prisma.$transaction([
      this.prisma.food.findMany(query),
      this.prisma.food.count({ where: query.where }),
    ]);

    this.logger.log(`results -> ${JSON.stringify(results)}`);
    this.logger.log(`count -> ${JSON.stringify(count)}`);

    if (!results) throw new NotFoundException();

    return {
      data: results,
      pagination: {
        count,
        offset: parseInt(offset),
        maxResults: parseInt(maxResults),
      },
    };
  }

  async getFoodById({ id }: { id: number }) {
    const results = await this.prisma.food.findUnique({
      where: {
        id,
      },
    });

    this.logger.log(`results -> ${JSON.stringify(results)}`);

    if (!results) throw new NotFoundException();

    return results;
  }

  async create(foodDto: FoodDto) {
    const created = await this.prisma.food.create({
      data: foodDto,
    });

    this.logger.log(`foodDto -> ${JSON.stringify(foodDto)}`);
    this.logger.log(`created -> ${JSON.stringify(created)}`);

    if (!created) return foodDto;

    return created;
  }
}

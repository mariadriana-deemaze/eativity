import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./../prisma/prisma.service";
import { RecipeDto } from "./dto";

@Injectable()
export class RecipeService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  private readonly logger = new Logger(RecipeService.name);

  async getRecipesBySearch({
    name,
    offset,
    maxResults,
  }: {
    name: string;
    offset?: string;
    maxResults?: string;
  }) {
    const query: Prisma.RecipeFindManyArgs = {
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
      this.prisma.recipe.findMany(query),
      this.prisma.recipe.count({ where: query.where }),
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

  async getRecipeById({ id }: { id: number }) {
    const results = await this.prisma.recipe.findUnique({
      where: {
        id,
      },
    });

    this.logger.log(`results -> ${JSON.stringify(results)}`);

    if (!results) throw new NotFoundException();

    return results;
  }

  async getMany(args: Prisma.RecipeFindManyArgs) {
    const query: Prisma.RecipeFindManyArgs = {
      ...args,
      orderBy: { createdAt: "desc" },
    };

    const [results, count] = await this.prisma.$transaction([
      this.prisma.recipe.findMany(query),
      this.prisma.recipe.count({ where: query.where }),
    ]);

    this.logger.log(`results -> ${JSON.stringify(results)}`);
    this.logger.log(`count -> ${JSON.stringify(count)}`);

    if (!results) throw new NotFoundException();

    return {
      data: results,
      pagination: {
        count,
        offset: query.skip,
        maxResults: query.take,
      },
    };
  }

  async create(recipeDto: RecipeDto) {
    const created = await this.prisma.recipe.create({
      data: recipeDto,
    });

    this.logger.log(`recipeDto -> ${JSON.stringify(recipeDto)}`);
    this.logger.log(`created -> ${JSON.stringify(created)}`);

    if (!created) return recipeDto;

    return created;
  }

  async edit({ id, recipeDto }: { id: number; recipeDto: RecipeDto }) {
    const edited = await this.prisma.recipe.update({
      where: {
        id,
      },
      data: recipeDto,
    });

    this.logger.log(`recipeDto -> ${JSON.stringify(recipeDto)}`);
    this.logger.log(`edited -> ${JSON.stringify(edited)}`);

    if (!edited) return recipeDto;

    return edited;
  }
}

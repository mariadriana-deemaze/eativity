import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MediaType, Prisma } from "@prisma/client";
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
      include: {
        categories: {
          select: {
            title: true,
            id: true,
          },
        },
        image: true,
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
      include: {
        image: true,
      },
    });

    this.logger.log(`results -> ${JSON.stringify(results)}`);

    if (!results) throw new NotFoundException();

    return results;
  }

  async getMany(args: Prisma.RecipeFindManyArgs) {
    const query: Prisma.RecipeFindManyArgs = {
      ...args,
      include: { image: true },
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
    console.log("recipeDto ->", recipeDto);

    /*  let imageId;

    if (recipeDto.image) {
      const created = await this.prisma.media.create({
        data: { path: recipeDto.image.path, type: MediaType.IMAGE },
      });

      imageId = created.id;
    } */

    const created = await this.prisma.recipe.create({
      data: {
        ...recipeDto,
        /* image: {
          connect: {
            id: imageId,
          },
        }, */
        image: undefined,
      },
    });

    this.logger.log(`recipeDto -> ${JSON.stringify(recipeDto)}`);
    this.logger.log(`created -> ${JSON.stringify(created)}`);

    if (!created) return recipeDto;

    return created;
  }

  async edit({ id, recipeDto }: { id: number; recipeDto: RecipeDto }) {
    let imageId;

    if (recipeDto.image) {
      const created = await this.prisma.media.create({
        data: { path: recipeDto.image, type: MediaType.IMAGE },
      });

      imageId = created.id;
    }

    const edited = await this.prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name: recipeDto.name,
        description: recipeDto.description,
        proteins: recipeDto.proteins,
        carbohydrates: recipeDto.carbohydrates,
        calories: recipeDto.calories,
        fats: recipeDto.fats,
        imageId,
      },
      include: {
        image: true,
      },
    });

    this.logger.log(`recipeDto -> ${JSON.stringify(recipeDto)}`);
    this.logger.log(`edited -> ${JSON.stringify(edited)}`);

    if (!edited) return recipeDto;

    return edited;
  }
}

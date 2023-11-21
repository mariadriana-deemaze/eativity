import { Injectable } from "@nestjs/common";

import { Prisma, Weight } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WeightService {
  constructor(private prisma: PrismaService) {}

  // Get latest inserted record of a user weight
  async getLatestWeight(where: Prisma.WeightWhereInput): Promise<Weight> {
    const userWeights = await this.prisma.weight.findMany({
      orderBy: { id: "desc" },
      where,
    });
    return userWeights[0];
  }

  async deleteUserWeights({ where }: { where: Prisma.WeightWhereUniqueInput }) {
    return this.prisma.weight.deleteMany({
      where,
    });
  }
}

import { Injectable } from "@nestjs/common";

import { Prisma, User, Weight } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WeightService {
  constructor(private prisma: PrismaService) {}

  async deleteUserWeights({
    where
  }: {
    where: Prisma.WeightWhereUniqueInput;
  }): Promise<any> {
    return this.prisma.weight.deleteMany({
      where,
    });
  }
}

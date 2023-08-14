import { Injectable } from "@nestjs/common";

import { Prisma} from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async deleteUserPlans({
    where
  }: {
    where: Prisma.PlanWhereUniqueInput;
  }): Promise<any> {
    return this.prisma.plan.deleteMany({
      where,
    });
  }
}

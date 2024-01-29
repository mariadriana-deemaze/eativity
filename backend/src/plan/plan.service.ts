import { Injectable } from "@nestjs/common";

import { Prisma, User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { CreatePlanDto, EditPlanDto } from "./dto";

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  async getUserPlan(user: User) {
    return this.prisma.plan.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  async createUserPlan(user: User, plan: CreatePlanDto) {
    return this.prisma.plan.create({
      data: {
        ...plan,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async editUserPlan(user: User, plan: EditPlanDto) {
    return this.prisma.plan.update({
      where: {
        userId: user.id,
      },
      data: plan,
    });
  }

  async deleteUserPlan({ where }: { where: Prisma.PlanWhereUniqueInput }) {
    return this.prisma.plan.deleteMany({
      where,
    });
  }
}

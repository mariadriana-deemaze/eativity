import { Injectable } from "@nestjs/common";

import { Prisma, User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(params: {
    data: Prisma.UserUpdateInput & { plan: Prisma.PlanCreateWithoutUserInput };
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { data, where } = params;

    const weightCreateData = data.weight
      ? { create: { weight: Number(data.weight) } }
      : undefined;

    const planCreateData = data.plan ? { create: { ...data.plan } } : undefined;

    return this.prisma.user
      .update({
        where,
        data: {
          ...data,
          weight: weightCreateData,
          plan: planCreateData,
        },
        include: {
          weight: true,
          plan: true,
        },
      })
      .then((user) => {
        delete user.password_hash;
        return user;
      });
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  async deleteUser({
    where,
  }: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}

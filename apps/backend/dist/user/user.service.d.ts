import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(params: {
        data: Prisma.UserUpdateInput & {
            plan: Prisma.PlanCreateWithoutUserInput;
        };
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User>;
    getUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
    deleteUser({ where, }: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User>;
}

import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class PlanService {
    private prisma;
    constructor(prisma: PrismaService);
    deleteUserPlans({ where }: {
        where: Prisma.PlanWhereUniqueInput;
    }): Promise<Prisma.BatchPayload>;
}

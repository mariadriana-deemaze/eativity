import { Prisma, Weight } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class WeightService {
    private prisma;
    constructor(prisma: PrismaService);
    getLatestWeight(where: Prisma.WeightWhereInput): Promise<Weight>;
    deleteUserWeights({ where }: {
        where: Prisma.WeightWhereUniqueInput;
    }): Promise<any>;
}

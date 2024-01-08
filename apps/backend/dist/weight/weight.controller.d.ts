import { WeightService } from "./weight.service";
import { User, Weight } from "@prisma/client";
export declare class WeightController {
    private weightService;
    constructor(weightService: WeightService);
    getLatestWeight(user: User): Promise<Weight>;
    deleteWeights(user: User): Promise<import(".prisma/client").Prisma.BatchPayload>;
}

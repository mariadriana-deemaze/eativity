import { PlanService } from "./plan.service";
import { User } from "@prisma/client";
export declare class PlanController {
    private planService;
    constructor(planService: PlanService);
    deletePlans(user: User): Promise<any>;
}

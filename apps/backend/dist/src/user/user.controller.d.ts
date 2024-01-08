import { UserService } from "./user.service";
import { WeightService } from "../weight/weight.service";
import { PlanService } from "../plan/plan.service";
import { User, User as UserModel, Prisma } from "@prisma/client";
export declare class UserController {
    private userService;
    private weightService;
    private planService;
    constructor(userService: UserService, weightService: WeightService, planService: PlanService);
    getMe(user: User): Promise<any>;
    editUser(user: User, userData: Prisma.UserUpdateInput): Promise<UserModel>;
    deleteUser(user: User): Promise<UserModel>;
}

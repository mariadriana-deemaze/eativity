"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const weight_service_1 = require("../weight/weight.service");
const plan_service_1 = require("../plan/plan.service");
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
let UserController = class UserController {
    constructor(userService, weightService, planService) {
        this.userService = userService;
        this.weightService = weightService;
        this.planService = planService;
    }
    async getMe(user) {
        const where = { userId: user.id };
        const latestWeightRecord = await this.weightService.getLatestWeight(where);
        const response = Object.assign({}, user);
        if (latestWeightRecord) {
            response.weight = latestWeightRecord.weight;
        }
        return response;
    }
    async editUser(user, userData) {
        return this.userService.editUser({
            where: { id: user.id },
            data: Object.assign(Object.assign({}, userData), { height: Number(userData.height), password_hash: userData.password }),
        });
    }
    async deleteUser(user) {
        await this.weightService.deleteUserWeights({
            where: {
                id: user.id,
            },
        });
        await this.planService.deleteUserPlans({
            where: {
                id: user.id,
            },
        });
        return this.userService.deleteUser({
            where: { id: user.id },
        });
    }
};
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)("me"),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object, typeof (_c = typeof client_1.Prisma !== "undefined" && client_1.Prisma.UserUpdateInput) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Delete)("me"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        weight_service_1.WeightService,
        plan_service_1.PlanService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightController = void 0;
const weight_service_1 = require("./weight.service");
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const client_1 = require("@prisma/client");
const decorator_1 = require("../auth/decorator");
let WeightController = class WeightController {
    constructor(weightService) {
        this.weightService = weightService;
    }
    async getLatestWeight(user) {
        return this.weightService.getLatestWeight({ id: user.id });
    }
    async deleteWeights(user) {
        return this.weightService.deleteUserWeights({
            where: { id: user.id },
        });
    }
};
__decorate([
    (0, common_1.Get)("/latest"),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], WeightController.prototype, "getLatestWeight", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof client_1.User !== "undefined" && client_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], WeightController.prototype, "deleteWeights", null);
WeightController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)("weight"),
    __metadata("design:paramtypes", [weight_service_1.WeightService])
], WeightController);
exports.WeightController = WeightController;
//# sourceMappingURL=weight.controller.js.map
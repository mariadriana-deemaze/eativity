import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        password_hash: string;
        createdAt: Date;
        updatedAt: Date;
        measurementUnit: import(".prisma/client").$Enums.MeasurementUnit;
        birthdate: Date;
        gender: import(".prisma/client").$Enums.Gender;
        height: number;
    }>;
}
export {};

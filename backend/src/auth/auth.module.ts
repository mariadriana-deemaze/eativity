import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";

import { AuthService } from "./auth.service";

import { FatSecretService } from "./../fat-secret/fat-secret.service";

import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FatSecretService],
})
export class AuthModule {}

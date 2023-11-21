import { ForbiddenException, Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "../prisma/prisma.service";

import { AuthDto } from "./dto";

import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async createUser(dto: AuthDto) {
    const password_hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password_hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === "P2002") {
        throw new ForbiddenException("Credentials taken");
      }
      throw error;
    }
  }

  async authenticateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException("Credentials incorrect");

    const passwordMatch = await argon.verify(user.password_hash, dto.password);

    if (!passwordMatch) throw new ForbiddenException("Credentials incorrect");

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret,
    });

    return {
      access_token: token,
    };
  }
}

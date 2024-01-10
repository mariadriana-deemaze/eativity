import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { MailerService } from "@nestjs-modules/mailer";

import { JwtService } from "@nestjs/jwt";

import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { Cache } from "cache-manager";

import { PrismaService } from "../prisma/prisma.service";

import { FatSecretService } from "../fat-secret/fat-secret.service";

import { AuthDto } from "./dto";

import { render } from "@react-email/render";

import { WelcomeEmail } from "../../templates/welcome";

import * as argon from "argon2";

import { EMAIL_SENDER } from "utils";

import { FatSecretApiTokenResponse } from "types";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailerService: MailerService,
    private fatSecretService: FatSecretService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async createUser({ email, name, password }: AuthDto) {
    const password_hash = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          password_hash,
        },
      });

      const token = await this.signToken(user.id, user.email);

      const html = render(WelcomeEmail({ name, email }));

      await this.mailerService.sendMail({
        to: email,
        from: EMAIL_SENDER,
        subject: `Welcome to Eativity ${name}`,
        html,
      });

      return token;
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

    // Check for FAT SECRET API existant access token
    const accessToken = await this.cacheManager.get("access_token");

    if (!accessToken) {
      const response =
        (await this.fatSecretService.getAppToken()) as unknown as FatSecretApiTokenResponse;

      // Store it in app cache
      await this.cacheManager.set(
        "access_token",
        response.access_token,
        response.expires_in * 1000 // seconds -> milliseconds
      );
    }

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

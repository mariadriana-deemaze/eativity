import { AuthService } from "./auth.service";

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Create user
  @Post("sign-up")
  async signUp(@Body() dto: AuthDto) {
    return this.authService.createUser(dto);
  }

  // Login user
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(@Body() dto: AuthDto) {
    return this.authService.authenticateUser(dto);
  }
}

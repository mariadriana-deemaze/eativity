import { UserService } from "./user.service";

import { Controller, Post, Body, Delete, Param, Get } from "@nestjs/common";

import { User as UserModel } from "@prisma/client";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // Create user
  @Post("sign-up")
  async signUp(
    @Body() userData: { name: string; email: string; password_hash: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  // Login user
  @Post("sign-in")
  async signIn(@Body() userData: { email: string; password_hash: string }) {
    return this.userService.authenticateUser(userData);
  }

  // Update user
  @Post(":id/update")
  async editUser(
    @Param("id") id: string,
    @Body()
    userData: {
      name: string;
      email: string;
      password_hash: string;
    }
  ): Promise<UserModel> {
    const { name, email, password_hash } = userData;
    return this.userService.editUser({
      where: { id: Number(id) },
      data: { name, email, password_hash },
    });
  }

  // Get user details
  @Get(":id")
  async getUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.getUser({
      id: Number(id),
    });
  }

  // Delete user
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.userService.deleteUser({
      id: Number(id),
    });
  }
}

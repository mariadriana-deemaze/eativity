import { UserService } from "./user.service";

import { Controller, Body, Delete, Param, Get, Patch, UseGuards, Req } from "@nestjs/common";

import { JwtGuard } from "../auth/guard";

import { User, User as UserModel } from "@prisma/client";

import { GetUser } from "../auth/decorator";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser() user:User) {
    return user
  }

  // Update user
  @Patch(":id")
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

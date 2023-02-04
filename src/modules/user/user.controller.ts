import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AccessTokenGuard } from "./../../common/guards";

import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("todo/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findUserById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}

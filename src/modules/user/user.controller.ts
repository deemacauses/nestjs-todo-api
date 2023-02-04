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

import { Public } from "./../../common/decorators";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("todo/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Public()
  @Get(":id")
  findUserById(@Param("id") id: string) {
    return this.usersService.findUserById(id);
  }

  @Public()
  @UseGuards(AccessTokenGuard)
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Public()
  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { GetCurrentUser, Public } from "src/common/decorators";
import { AuthDTO } from "./dto/auth.dto";

@Controller("todo/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signup(createUserDto);
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }

  @Public()
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser("id") userId: string) {
    return this.authService.logout(userId);
  }
}

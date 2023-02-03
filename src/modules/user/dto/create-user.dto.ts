import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsDate,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  createdAt: Date;
  refreshToken: string;
}

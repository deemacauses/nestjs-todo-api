import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

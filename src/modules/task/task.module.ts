import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskSchema } from "./schema/task.schema";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}

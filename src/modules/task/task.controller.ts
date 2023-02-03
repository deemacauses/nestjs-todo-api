import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";

import { TaskService } from "./task.service";
import { GetCurrentUser, Public } from "src/common/decorators";
import { CreateTaskDTO, UpdateTaskDTO } from "./dto";

@Controller("todo/tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Public()
  @Post()
  async addTask(
    @GetCurrentUser() userId: string,
    @Body() createTaskDTO: CreateTaskDTO,
  ) {
    const task = await this.taskService.addTask(userId, createTaskDTO);
    return task;
  }

  @Get()
  async getAllTasks() {
    const tasks = await this.taskService.getAllTasks();
    if (!tasks) throw new NotFoundException("There is no tasks yet!");
    return tasks;
  }

  @Get("/:id")
  async getTask(@GetCurrentUser("id") userId: string, @Param() taskId: string) {
    const task = await this.taskService.getTask(userId, taskId);
    if (!task) throw new NotFoundException("Task does not exist!");
    return task;
  }

  @Patch("/:id")
  async updateTask(
    @GetCurrentUser("id") userId: string,
    @Param("id") taskId: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    const task = await this.taskService.updateTask(
      userId,
      taskId,
      updateTaskDTO,
    );
    if (!task) throw new NotFoundException("Task does not exist!");
    return task;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:id")
  async deleteTask(
    @GetCurrentUser("id") userId: string,
    @Param("id") taskId: string,
  ) {
    const task = await this.taskService.deleteTask(userId, taskId);
    if (!task) throw new NotFoundException("Task does not exist");
    return task;
  }
}

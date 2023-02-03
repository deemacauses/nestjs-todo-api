import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateTaskDTO, UpdateTaskDTO } from "./dto";
import { Task, TaskDocument } from "./schema/task.schema";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel("Task")
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async addTask(userId: string, createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = await this.taskModel.create({ userId, createTaskDTO });
    return newTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    if (!tasks || tasks.length == 0) {
      throw new NotFoundException("Tasks data not found!");
    }
    return tasks;
  }

  async getTask(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ userId, taskId }).exec();
    if (!task) {
      throw new NotFoundException(`Task not found`);
    }
    return task;
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDTO: UpdateTaskDTO,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(updateTaskDTO, {
      new: true,
    });

    // check if user owns the task
    if (!updatedTask || updatedTask.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    return updatedTask;
  }

  async deleteTask(userId: string, taskId: string): Promise<any> {
    const deletedTask = await this.taskModel.findByIdAndRemove({
      userId,
      taskId,
    });
    // check if user owns the bookmark
    if (!deletedTask || deletedTask.userId !== userId)
      throw new ForbiddenException("Access to resources denied");

    return deletedTask;
  }
}

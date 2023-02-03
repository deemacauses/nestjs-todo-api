import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "./schema/user.schema";
import { CreateUserDTO, UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create User
  async createUser(createUserDto: CreateUserDTO): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Find All Users
  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  // Find User By ID
  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  // Find User by Username
  async findUserByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  // Update User
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  // Remove User
  async deleteUser(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

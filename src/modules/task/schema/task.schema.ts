import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: true,
    enum: ["high", "medium", "low"],
  })
  priority: string;

  @Prop({
    required: true,
    enum: ["todo", "doing", "done"],
  })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  userId: string;

  @Prop({ default: Date.now })
  createAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

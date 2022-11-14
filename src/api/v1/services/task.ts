import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Task, { TaskDocument } from "../models/task.model";

export async function createTask(input: any) {
  return Task.create(input);
}

export async function findTask(
  query: FilterQuery<TaskDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Task.findOne(query, select, options);
}

export async function findAndUpdateTask(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions
) {
  return Task.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<TaskDocument>) {
  return Task.deleteOne(query);
}

export async function aggregateTask(operators: PipelineStage[]) {
  return Task.aggregate(operators);
}

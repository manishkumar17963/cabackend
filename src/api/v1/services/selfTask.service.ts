import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import SelfTask, { SelfTaskDocument, SelfTaskInput } from "../models/selfTask";

export async function createSelfTask(input: SelfTaskInput) {
  return SelfTask.create(input);
}

export async function findSelfTask(
  query: FilterQuery<SelfTaskDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return SelfTask.findOne(query, select, options);
}

export async function findAllSelfTask(
  query: FilterQuery<SelfTaskDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return SelfTask.find(query, select, options);
}

export async function findAndUpdateSelfTask(
  query: FilterQuery<SelfTaskDocument>,
  update: UpdateQuery<SelfTaskDocument>,
  options: QueryOptions
) {
  return SelfTask.findOneAndUpdate(query, update, options);
}

export async function deleteSelfTask(query: FilterQuery<SelfTaskDocument>) {
  return SelfTask.deleteOne(query);
}

export async function aggregateSelfTask(operators: PipelineStage[]) {
  return SelfTask.aggregate(operators);
}

import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Project, { ProjectDocument } from "../models/project.model";

export async function createProject(input: any) {
  return Project.create(input);
}

export async function findProject(
  query: FilterQuery<ProjectDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Project.findOne(query, select, options);
}

export async function findAndUpdateProject(
  query: FilterQuery<ProjectDocument>,
  update: UpdateQuery<ProjectDocument>,
  options: QueryOptions
) {
  return Project.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<ProjectDocument>) {
  return Project.deleteOne(query);
}

export async function aggregateProject(operators: PipelineStage[]) {
  return Project.aggregate(operators);
}

import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Request, { RequestDocument } from "../models/request";

export async function createRequest(input: any) {
  return Request.create(input);
}

export async function findRequest(
  query: FilterQuery<RequestDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Request.findOne(query, select, options);
}

export async function findAndUpdateRequest(
  query: FilterQuery<RequestDocument>,
  update: UpdateQuery<RequestDocument>,
  options: QueryOptions
) {
  return Request.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<RequestDocument>) {
  return Request.deleteOne(query);
}

export async function aggregateRequest(operators: PipelineStage[]) {
  return Request.aggregate(operators);
}

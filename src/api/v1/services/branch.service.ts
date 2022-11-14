import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Branch, { BranchInput, BranchDocument } from "../models/branch.model";

export async function createBranch(input: BranchInput) {
  return Branch.create(input);
}

export async function findBranch(
  query: FilterQuery<BranchDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Branch.findOne(query, select, options);
}

export async function findAndUpdateBranch(
  query: FilterQuery<BranchDocument>,
  update: UpdateQuery<BranchDocument>,
  options: QueryOptions
) {
  return Branch.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<BranchDocument>) {
  return Branch.deleteOne(query);
}

export async function aggregateBranch(operators: PipelineStage[]) {
  return Branch.aggregate(operators);
}

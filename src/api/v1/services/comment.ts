import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Comment, { CommentDocument } from "../models/comment";

export async function createComment(input: any) {
  return Comment.create(input);
}

export async function findComment(
  query: FilterQuery<CommentDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Comment.findOne(query, select, options);
}

export async function findAndUpdateComment(
  query: FilterQuery<CommentDocument>,
  update: UpdateQuery<CommentDocument>,
  options: QueryOptions
) {
  return Comment.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<CommentDocument>) {
  return Comment.deleteOne(query);
}

export async function aggregateComment(operators: PipelineStage[]) {
  return Comment.aggregate(operators);
}

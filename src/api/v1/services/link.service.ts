import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Link, { LinkDocument, LinkInput } from "../models/link.model";

export async function createLink(input: LinkInput) {
  return Link.create(input);
}

export async function findLink(
  query: FilterQuery<LinkDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Link.findOne(query, select, options);
}

export async function findAllLink(
  query: FilterQuery<LinkDocument>,
  select: { [key: string]: number | string | Boolean } = {},
  options: QueryOptions = {}
) {
  return Link.find(query, select, options);
}

export async function findAndUpdateLink(
  query: FilterQuery<LinkDocument>,
  update: UpdateQuery<LinkDocument>,
  options: QueryOptions
) {
  return Link.findOneAndUpdate(query, update, options);
}

export async function updateAllLink(
  query: FilterQuery<LinkDocument>,
  update: UpdateQuery<LinkDocument>,
  options: QueryOptions
) {
  return Link.updateMany(query, update, options);
}

export async function deleteLink(query: FilterQuery<LinkDocument>) {
  return Link.deleteOne(query);
}

export async function findAndDeleteLink(query: FilterQuery<LinkDocument>) {
  return Link.findOneAndDelete(query);
}

export async function aggregateLink(operators: PipelineStage[]) {
  return Link.aggregate(operators);
}

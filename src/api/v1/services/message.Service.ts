import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Message, { MessageDocument } from "../models/message.model";

export async function createMessage(input: any) {
  return Message.create(input);
}

export async function findMessage(
  query: FilterQuery<MessageDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Message.findOne(query, select, options);
}

export async function findAllMessage(
  query: FilterQuery<MessageDocument>,
  select: { [key: string]: number | string | Boolean } = {},
  options: QueryOptions = {}
) {
  return Message.find(query, select, options);
}

export async function findAndUpdateMessage(
  query: FilterQuery<MessageDocument>,
  update: UpdateQuery<MessageDocument>,
  options: QueryOptions
) {
  return Message.findOneAndUpdate(query, update, options);
}

export async function updateAllMessage(
  query: FilterQuery<MessageDocument>,
  update: UpdateQuery<MessageDocument>,
  options: QueryOptions
) {
  return Message.updateMany(query, update, options);
}

export async function deleteMessage(query: FilterQuery<MessageDocument>) {
  return Message.deleteOne(query);
}

export async function findAndDeleteMessage(
  query: FilterQuery<MessageDocument>
) {
  return Message.findOneAndDelete(query);
}

export async function aggregateMessage(operators: PipelineStage[]) {
  return Message.aggregate(operators);
}

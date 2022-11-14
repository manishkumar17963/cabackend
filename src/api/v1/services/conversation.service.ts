import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Conversation, {
  ConversationDocument,
} from "../models/conversation.model";

export async function createConversation(input: any) {
  return Conversation.create(input);
}

export async function findConversation(
  query: FilterQuery<ConversationDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Conversation.findOne(query, select, options);
}

export async function findAllConversation(
  query: FilterQuery<ConversationDocument>,
  select: { [key: string]: number | string | Boolean } = {},
  options: QueryOptions = {}
) {
  return Conversation.find(query, select, options);
}

export async function findAndUpdateConversation(
  query: FilterQuery<ConversationDocument>,
  update: UpdateQuery<ConversationDocument>,
  options: QueryOptions
) {
  return Conversation.findOneAndUpdate(query, update, options);
}

export async function updateAllConversation(
  query: FilterQuery<ConversationDocument>,
  update: UpdateQuery<ConversationDocument>,
  options: QueryOptions
) {
  return Conversation.updateMany(query, update, options);
}

export async function deleteConversation(
  query: FilterQuery<ConversationDocument>
) {
  return Conversation.deleteOne(query);
}

export async function findAndDeleteConversation(
  query: FilterQuery<ConversationDocument>
) {
  return Conversation.findOneAndDelete(query);
}

export async function aggregateConversation(operators: PipelineStage[]) {
  return Conversation.aggregate(operators);
}

import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Notification, { NotificationDocument } from "../models/notification";

export async function createNotification(input: any) {
  return Notification.create(input);
}

export async function findNotification(
  query: FilterQuery<NotificationDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Notification.findOne(query, select, options);
}

export async function findAndUpdateNotification(
  query: FilterQuery<NotificationDocument>,
  update: UpdateQuery<NotificationDocument>,
  options: QueryOptions
) {
  return Notification.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<NotificationDocument>) {
  return Notification.deleteOne(query);
}

export async function aggregateNotification(operators: PipelineStage[]) {
  return Notification.aggregate(operators);
}

import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Meeting, { MeetingDocument } from "../models/meeting";

export async function createMeeting(input: any) {
  return Meeting.create(input);
}

export async function findMeeting(
  query: FilterQuery<MeetingDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Meeting.findOne(query, select, options);
}

export async function findAllMeeting(
  query: FilterQuery<MeetingDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Meeting.find(query, select, options);
}

export async function findAndUpdateMeeting(
  query: FilterQuery<MeetingDocument>,
  update: UpdateQuery<MeetingDocument>,
  options: QueryOptions
) {
  return Meeting.findOneAndUpdate(query, update, options);
}

export async function deleteMeeting(query: FilterQuery<MeetingDocument>) {
  return Meeting.deleteOne(query);
}

export async function findAndDeleteMeeting(
  query: FilterQuery<MeetingDocument>
) {
  return Meeting.findOneAndDelete(query);
}

export async function aggregateMeeting(operators: PipelineStage[]) {
  return Meeting.aggregate(operators);
}

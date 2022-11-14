import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Holiday, { HolidayDocument } from "../models/holiday";

export async function createHoliday(input: any) {
  return Holiday.create(input);
}

export async function findHoliday(
  query: FilterQuery<HolidayDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Holiday.findOne(query, select, options);
}

export async function findAndUpdateHoliday(
  query: FilterQuery<HolidayDocument>,
  update: UpdateQuery<HolidayDocument>,
  options: QueryOptions
) {
  return Holiday.findOneAndUpdate(query, update, options);
}

export async function deleteHoliday(query: FilterQuery<HolidayDocument>) {
  return Holiday.deleteOne(query);
}

export async function findAndDeleteHoliday(
  query: FilterQuery<HolidayDocument>,
  options: QueryOptions<HolidayDocument>
) {
  return Holiday.findOneAndDelete(query, options);
}

export async function aggregateHoliday(operators: PipelineStage[]) {
  return Holiday.aggregate(operators);
}

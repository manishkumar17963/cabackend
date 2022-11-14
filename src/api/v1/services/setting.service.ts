import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Setting, { SettingDocument } from "../models/setting.model";

export async function createSetting(input: any) {
  return Setting.create(input);
}

export async function findSetting(
  query: FilterQuery<SettingDocument>,
  select: { [key: string]: number } = {}
) {
  if (select) {
    return Setting.findOne(query).select(select);
  } else {
    return Setting.findOne(query);
  }
}

export async function findAllSetting(
  query: FilterQuery<SettingDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions<SettingDocument> = {}
) {
  return Setting.find(query, select);
}

export async function findAndUpdateSetting(
  query: FilterQuery<SettingDocument>,
  update: UpdateQuery<SettingDocument>,
  options: QueryOptions
) {
  return Setting.findOneAndUpdate(query, update, options);
}

export async function deleteSetting(query: FilterQuery<SettingDocument>) {
  return Setting.deleteOne(query);
}

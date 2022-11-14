import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Admin, { AdminDocument } from "../models/admin";

export async function createAdmin(input: any) {
  return Admin.create(input);
}

export async function findAdmin(
  query: FilterQuery<AdminDocument>,
  select: { [key: string]: number } = {}
) {
  if (select) {
    return Admin.findOne(query).select(select);
  } else {
    return Admin.findOne(query);
  }
}

export async function findAllAdmin(
  query: FilterQuery<AdminDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions<AdminDocument> = {}
) {
  return Admin.find(query, select);
}

export async function validatePassword({
  number,
  password,
}: {
  number: AdminDocument["_id"];
  password: string;
}) {
  try {
    const admin = await Admin.findOne({ _id: number });

    if (!admin) {
      return false;
    }

    const isValid = await admin.comparePassword(password);
    console.log(admin, isValid);
    if (!isValid) {
      return false;
    }

    return admin;
  } catch (err) {}
}

export async function findAndUpdateAdmin(
  query: FilterQuery<AdminDocument>,
  update: UpdateQuery<AdminDocument>,
  options: QueryOptions
) {
  return Admin.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<AdminDocument>) {
  return Admin.deleteOne(query);
}

export async function aggregateAdmin(operators: PipelineStage[]) {
  return Admin.aggregate(operators);
}

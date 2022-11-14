import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Employee, { EmployeeDocument } from "../models/employee";

export async function createEmployee(input: any) {
  return Employee.create(input);
}

export async function findEmployee(
  query: FilterQuery<EmployeeDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Employee.findOne(query, select, options);
}

export async function validatePassword({
  number,
  password,
}: {
  number: string;
  password: string;
  tokens: 1;
}) {
  try {
    const employee = await Employee.findOne({ number: number });

    if (!employee) {
      return false;
    }

    const isValid = await employee.comparePassword(password);
    console.log(employee, password, isValid);
    if (!isValid) {
      return false;
    }

    return employee;
  } catch (err) {
    console.log(err);
  }
}

export async function findAndUpdateEmployee(
  query: FilterQuery<EmployeeDocument>,
  update: UpdateQuery<EmployeeDocument>,
  options: QueryOptions
) {
  return Employee.findOneAndUpdate(query, update, options);
}

export async function updateAllEmployee(
  query: FilterQuery<EmployeeDocument>,
  update: UpdateQuery<EmployeeDocument>,
  options: QueryOptions
) {
  return Employee.updateMany(query, update, options);
}

export async function deletePost(query: FilterQuery<EmployeeDocument>) {
  return Employee.deleteOne(query);
}

export async function aggregateEmployee(operators: PipelineStage[]) {
  return Employee.aggregate(operators);
}

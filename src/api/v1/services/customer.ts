import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Customer, { CustomerDocument } from "../models/customer";

export async function createCustomer(input: any) {
  return Customer.create(input);
}

export async function findCustomer(
  query: FilterQuery<CustomerDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Customer.findOne(query, select, options);
}

export async function validatePassword({
  number,
  password,
}: {
  number: CustomerDocument["_id"];
  password: string;
  tokens: 1;
}) {
  try {
    const customer = await Customer.findOne({ number: number });

    if (!customer) {
      return false;
    }

    const isValid = await customer.comparePassword(password);
    console.log(customer, password, isValid);
    if (!isValid) {
      return false;
    }

    return customer;
  } catch (err) {
    console.log(err);
  }
}

export async function findAndUpdateCustomer(
  query: FilterQuery<CustomerDocument>,
  update: UpdateQuery<CustomerDocument>,
  options: QueryOptions
) {
  return Customer.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<CustomerDocument>) {
  return Customer.deleteOne(query);
}

export async function aggregateCustomer(operators: PipelineStage[]) {
  return Customer.aggregate(operators);
}

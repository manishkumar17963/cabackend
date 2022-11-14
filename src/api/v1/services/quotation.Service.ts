import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Quotation, {
  QuotationDocument,
  QuotationInput,
} from "../models/quotation.model";

export async function createQuotation(input: QuotationInput) {
  return Quotation.create(input);
}

export async function findQuotation(
  query: FilterQuery<QuotationDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Quotation.findOne(query, select, options);
}

export async function findAllQuotation(
  query: FilterQuery<QuotationDocument>,
  select: { [key: string]: number | string | Boolean } = {},
  options: QueryOptions = {}
) {
  return Quotation.find(query, select, options);
}

export async function findAndUpdateQuotation(
  query: FilterQuery<QuotationDocument>,
  update: UpdateQuery<QuotationDocument>,
  options: QueryOptions
) {
  return Quotation.findOneAndUpdate(query, update, options);
}

export async function updateAllQuotation(
  query: FilterQuery<QuotationDocument>,
  update: UpdateQuery<QuotationDocument>,
  options: QueryOptions
) {
  return Quotation.updateMany(query, update, options);
}

export async function deleteQuotation(query: FilterQuery<QuotationDocument>) {
  return Quotation.deleteOne(query);
}

export async function findAndDeleteQuotation(
  query: FilterQuery<QuotationDocument>
) {
  return Quotation.findOneAndDelete(query);
}

export async function aggregateQuotation(operators: PipelineStage[]) {
  return Quotation.aggregate(operators);
}

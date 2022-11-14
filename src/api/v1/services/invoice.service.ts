import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Invoice, {
  InvoiceDocument,
  InvoiceInput,
} from "../models/invoice.model";

export async function createInvoice(input: InvoiceInput) {
  return Invoice.create(input);
}

export async function findInvoice(
  query: FilterQuery<InvoiceDocument>,
  select: { [key: string]: number | string } = {},
  options: QueryOptions = {}
) {
  return Invoice.findOne(query, select, options);
}

export async function findAllInvoice(
  query: FilterQuery<InvoiceDocument>,
  select: { [key: string]: number | string | Boolean } = {},
  options: QueryOptions = {}
) {
  return Invoice.find(query, select, options);
}

export async function findAndUpdateInvoice(
  query: FilterQuery<InvoiceDocument>,
  update: UpdateQuery<InvoiceDocument>,
  options: QueryOptions
) {
  return Invoice.findOneAndUpdate(query, update, options);
}

export async function updateAllInvoice(
  query: FilterQuery<InvoiceDocument>,
  update: UpdateQuery<InvoiceDocument>,
  options: QueryOptions
) {
  return Invoice.updateMany(query, update, options);
}

export async function deleteInvoice(query: FilterQuery<InvoiceDocument>) {
  return Invoice.deleteOne(query);
}

export async function findAndDeleteInvoice(
  query: FilterQuery<InvoiceDocument>
) {
  return Invoice.findOneAndDelete(query);
}

export async function aggregateInvoice(operators: PipelineStage[]) {
  return Invoice.aggregate(operators);
}

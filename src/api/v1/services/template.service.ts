import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Template, {
  TemplateInput,
  TemplateDocument,
} from "../models/template.model";

export async function createTemplate(input: TemplateInput) {
  return Template.create(input);
}

export async function findTemplate(
  query: FilterQuery<TemplateDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Template.findOne(query, select, options);
}

export async function findAndUpdateTemplate(
  query: FilterQuery<TemplateDocument>,
  update: UpdateQuery<TemplateDocument>,
  options: QueryOptions
) {
  return Template.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<TemplateDocument>) {
  return Template.deleteOne(query);
}

export async function aggregateTemplate(operators: PipelineStage[]) {
  return Template.aggregate(operators);
}

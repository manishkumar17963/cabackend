import mongoose from "mongoose";

export interface QuotTemplateInput {
  terms: string[];
  name: string;
  description?: string;
  additionalNotes?: string;
  details?: string;
}

export interface QuotTemplateDocument
  extends mongoose.Document,
    QuotTemplateInput {}

var QuotTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    terms: [String],
    description: String,
    additionalNotes: String,
    details: String,
  },
  {
    timestamps: true,
  }
);
const QuotTemplate = mongoose.model<QuotTemplateDocument>(
  "Task",
  QuotTemplateSchema
);
export default QuotTemplate;

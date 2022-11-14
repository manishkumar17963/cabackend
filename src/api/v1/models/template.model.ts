import mongoose from "mongoose";

export interface TemplateInput {
  name: string;
  additionalNotes: string;
  terms: string[];
  details: string;
}

export interface TemplateDocument extends mongoose.Document, TemplateInput {}

const TemplateSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    alias: "name",
    unique: true,
  },
  details: { type: String, required: true },
  additionalNotes: { type: String, required: true },
  terms: [String],
});

const Template = mongoose.model<TemplateDocument>("Template", TemplateSchema);
export default Template;

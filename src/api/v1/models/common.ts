import mongoose from "mongoose";

export const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const PointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false }
);

export const PointLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    location: {
      type: PointSchema,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

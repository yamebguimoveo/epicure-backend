import { Schema, model, Types, models } from "mongoose";

export interface IDish {
  _id: Types.ObjectId;
  name: string;
  price: number;
  restaurant: Types.ObjectId;
  imageSrc: string;
  description: string;
  sensitivities: number[];
  lunch: boolean;
  breakfast: boolean;
  dinner: boolean;
}

const dishSchema = new Schema<IDish>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imageSrc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    description: {
      type: String,
    },
    sensitivities: {
      type: [String],
    },
    lunch: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    dinner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Dish = model("Dish", dishSchema);

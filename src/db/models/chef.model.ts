import { Schema, model, Types } from "mongoose";

export interface IChef {
  _id: Types.ObjectId;
  name: string;
  description: string;
  imageSrc: string;
}

const chefSchema = new Schema<IChef>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Chef = model("Chef", chefSchema);

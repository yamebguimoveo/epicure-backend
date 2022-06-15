import { Schema, model, Types } from "mongoose";

export interface IRestaurant {
  _id: Types.ObjectId;
  name: string;
  chef: Types.ObjectId;
  dishes: Types.ObjectId[];
  imageSrc: string;
  isOpen: boolean;
  new: boolean;
  mostPopular: boolean;
  openingHours: { open: number; close: number };
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    chef: {
      type: Schema.Types.ObjectId,
      ref: "Chef",
      required: true,
    },
    imageSrc: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    new: {
      type: Boolean,
    },
    mostPopular: {
      type: Boolean,
      default: false,
    },
    openingHours: {
      _id: false,
      type: {
        open: Number,
        close: Number,
      },
      default: { open: 420, close: 1260 },
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant = model("Restaurant", restaurantSchema);

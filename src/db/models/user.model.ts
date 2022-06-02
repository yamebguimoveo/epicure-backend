import { Schema, model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  passwordConfirm: boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please insert a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

export const User = model("User", userSchema);

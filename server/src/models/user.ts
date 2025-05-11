import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  title: string;
  content: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    yearOfBirth: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: {
        number: { type: Number, required: true },
        name: { type: String, required: true },
      },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    picture: {
      thumbnail: { type: String, required: true },
      large: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

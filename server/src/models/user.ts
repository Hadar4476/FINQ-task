import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  fullname: string;
  gender: string;
  age: number;
  yearOfBirth: number;
  phoneNumber: string;
  email: string;
  address: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  picture: {
    thumbnail: string;
    large: string;
  };
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

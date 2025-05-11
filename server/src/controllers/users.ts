import { Request, Response } from "express";

import User from "../models/user";

const getHistory = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const saveUser = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const newUser = new User({ ...user });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User was not found");
    }

    user.name = name;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User was not found");
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ userId });
  } catch (error) {
    console.log(error);
  }
};
export default {
  getHistory,
  saveUser,
  updateUser,
  deleteUser,
};

import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
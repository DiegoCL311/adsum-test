import { Request, Response } from "express";
import {
  IUser,
  userSchema,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
  getUser as getUserModel,
  getAllUsers as getAllUsersModel,
} from "../models/user";
import { ResultSetHeader } from "mysql2";

const createUser = async (req: Request, res: Response) => {
  const user: IUser = await userSchema.validate(req.body);

  const result: ResultSetHeader = await createUserModel(user);

  const newUser: IUser = { id: result.insertId, ...user };

  res.status(201).json(newUser);
};

const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await getUserModel(userId);
  res.status(200).json(user);
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersModel();
  res.status(200).json(users);
};

const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user: IUser = await userSchema.validate(req.body);

  const updatedUser = await updateUserModel(userId, user);

  res.status(200).json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const deletedUser = await deleteUserModel(userId);

  res.status(200).json(deletedUser);
};

export { createUser, getUser, getAllUsers, updateUser, deleteUser, userSchema };

import { Request, Response } from "express";
import {
  ICategory,
  getCategories as getCategoriesModel,
} from "../models/category";

const getCategories = async (req: Request, res: Response) => {
  const categories: ICategory = await getCategoriesModel();
  res.status(200).json(categories);
};

export { getCategories };

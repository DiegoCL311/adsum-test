import express, { Request, Response, NextFunction } from "express";
import * as categoryController from "../controllers/category";

const app = express.Router();

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const errorHandler =
  (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };

app.get("/all", errorHandler(categoryController.getCategories));

export default app;

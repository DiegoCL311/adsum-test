import express, { Request, Response, NextFunction } from "express";
import * as userController from "../controllers/user";

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

app.get("/all", errorHandler(userController.getAllUsers));

app.get("/:id", errorHandler(userController.getUser));

app.post("/new", errorHandler(userController.createUser));

app.put("/:id", errorHandler(userController.updateUser));

app.delete("/:id", errorHandler(userController.deleteUser));

export default app;

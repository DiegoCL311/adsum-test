// src/app.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import pool from "./database/db";
import errorMiddleware from "./middlewares/errorMiddleware";
import userRoutes from "./routes/user";
import categoryRoutes from "./routes/categories";
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//routes
app.use("/users", userRoutes);

app.use("/categories", categoryRoutes);

//middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test database connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected!");
    connection.release();
  })
  .catch((error) => {
    console.log("Database connection failed!", error);
  });

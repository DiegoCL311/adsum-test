import * as yup from "yup";
import pool from "../database/db";
import { RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";

export interface ICategory {
  id?: number;
  name: string;
}

const getCategories = async () => {
  const [categories] = await pool.query<ICategory & RowDataPacket[][]>(
    `SELECT * FROM categories`
  );

  return categories;
};

export { getCategories };

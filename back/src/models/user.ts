//Monolithico, dado que la app es sencilla
import * as yup from "yup";
import pool from "../database/db";
import { RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";

interface IUser {
  id?: number;
  fullname: string;
  companyName: string;
  email: string;
  phone: string;
  categoryId: number;
  categoryName?: string;
  message: string;
}

const userSchema = yup.object().shape({
  id: yup.number(),
  fullname: yup.string().required(),
  companyName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  categoryId: yup.number().required(),
  message: yup.string().required().typeError("400"),
});

const createUser = async (user: IUser) => {
  const res = await pool.query(
    "INSERT INTO users (fullname, companyName, email, phone, categoryId, message) VALUES (?, ?, ?, ?, ?, ?)",
    [
      user.fullname,
      user.companyName,
      user.email,
      user.phone,
      user.categoryId,
      user.message,
    ]
  );

  return res[0] as ResultSetHeader;
};

const getUser = async (id: number) => {
  const [user] = await pool.query<IUser & RowDataPacket[][]>(
    `SELECT u.fullname, u.companyName, u.phone, u.email, u.message, c.name as categoryName, c.id as categoryId FROM users u
        LEFT JOIN categories c ON u.categoryId = c.id
         WHERE u.id = ? AND u.status=1`,
    [id]
  );

  return user[0];
};

const getAllUsers = async () => {
  const [users] = await pool.query<IUser & RowDataPacket[][]>(
    `SELECT u.*, c.name as categoryName FROM users u
    LEFT JOIN categories c ON u.categoryId = c.id
     WHERE status=1`
  );

  return users;
};

const updateUser = async (id: number, user: IUser) => {
  const [res] = await pool.query<IUser & RowDataPacket[][]>(
    "UPDATE users SET fullname = ?, companyName = ?, email = ?, phone = ?, categoryId = ?, message = ? WHERE id = ?",
    [
      user.fullname,
      user.companyName,
      user.email,
      user.phone,
      user.categoryId,
      user.message,
      id,
    ]
  );

  return res[0];
};

const deleteUser = async (id: number) => {
  const [res] = await pool.query<IUser & RowDataPacket[][]>(
    "UPDATE users SET status = 0 WHERE id = ?",
    [id]
  );

  return res[0];
};

export {
  IUser,
  userSchema,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  if (err.message.includes("required")) {
    statusCode = 400; // Bad Request
  }

  console.log(
    `${statusCode} - Message= ${err.message} - Url=${req.originalUrl} - Method=${req.method} - IP=${req.ip}`
  );

  res.status(statusCode).json({
    message: err.message,
  });
};

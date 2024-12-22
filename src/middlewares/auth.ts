import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;


export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(' ')[1];
    if (!token) {
      throw new ErrorHandler("Access Denied", 401);
    }
    const userId = jwt.verify(token, ACCESS_TOKEN_SECRET);
    res.locals.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
}

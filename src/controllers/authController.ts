import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";


export const userController = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { firstName, lastName, email, password, dob } = req.body;
      const check = await User.findOne({ email });
      if (check) {
        throw new ErrorHandler("User Already Exists", 400);
      }
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        dob,
      });
      const saved = await user.save()

      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        saved,
      });
    } catch (e) {
      next(e);
    }
  },
  login: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const LoggedInUser = await User.findOne({ email });
      if (!LoggedInUser) {
        throw new ErrorHandler("User Doesn't Exists", 401);
      }

      const isMatch = await bcrypt.compare(password, LoggedInUser.password);

      if (!isMatch) {
        throw new ErrorHandler("Invalid Credentials", 401);
      }

      const accessToken = generateAccessToken(LoggedInUser.id);
      const refreshToken = generateRefreshToken(LoggedInUser.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        message: "Login Successful",
        accessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  refreshToken: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const refresh_Token = req.cookies.refreshToken;
      if (!refresh_Token) {
        throw new ErrorHandler("No Refresh Token Provided", 401);
      }

      let userId: string;

      try {
        userId = verifyRefreshToken(refresh_Token);
      } catch {
        throw new ErrorHandler("Invalid Refresh Token", 401);
      }

      const accessToken = generateAccessToken(userId);

      res.status(201).json({
        success: true,
        message: "Token Refreshed",
        accessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  logout: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.clearCookie("refreshToken");
      res.json({
        success: true,
        message: "Logged Out Successfully",
      })
    } catch (e) {
      next(e);
    }
  },
};

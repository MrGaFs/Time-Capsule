import express from "express";
import { userController } from "../controllers/authController";
import validate from "../middlewares/validate";
import { loginValidation, registerValidation } from "../validations/authValidation";
import auth from "../middlewares/auth";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later",
    });
  }
})

const userRouter = express.Router();

userRouter
  .post("/register", [validate(registerValidation), limiter], userController.register);

userRouter
  .post("/login", [validate(loginValidation), limiter], userController.login);

userRouter
  .post("/refresh-token", userController.refreshToken);

userRouter
  .post("/logout", userController.logout);

userRouter
  .post("/test-auth", auth, (_req, res) => {
    res.json({
      success: true,
      message: "User Authenticated",
    });
  });

export default userRouter;


import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = (schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: unknown) {
      if (error instanceof Joi.ValidationError) {
        res.status(400)
          .json({
            success: false,
            message: (error as Joi.ValidationError).details.map((detail: { message: unknown; }) => detail.message).join(", ")
          });
      }
    }
  };
};
export default validate;

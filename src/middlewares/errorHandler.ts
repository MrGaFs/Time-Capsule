import ErrorHandler from '../utils/errorHandler';


import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = async (err: ErrorHandler, req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';


  if (statusCode === 500)
    console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};

export default errorHandler;
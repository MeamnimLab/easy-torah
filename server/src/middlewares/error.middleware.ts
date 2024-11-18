import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../controllers/base/baseController.controller';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error Middleware:', {
    status: error.statusCode,
    message: error.message,
    stack: error.stack
  });

  const status: number = error.statusCode || 200;
  const message: string = error.message || 'Something went wrong';
  const key: string[] = error.key || [];

  res.status(status).json({
    message,
    key
  });
};

export default errorMiddleware;

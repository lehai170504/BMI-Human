import { Request, Response, NextFunction } from 'express';

// Định nghĩa các loại lỗi tùy chỉnh
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Hàm xử lý lỗi chính
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Đặt giá trị mặc định cho lỗi
  let error = { ...err };
  error.message = err.message;

  // Log lỗi để debug
  console.error('Error 💥:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    timestamp: new Date().toISOString()
  });

  // Xử lý các loại lỗi cụ thể
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again!';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired! Please log in again.';
    error = new AppError(message, 401);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join('. ');
    error = new AppError(message, 400);
  }

  if (err.name === 'CastError') {
    const message = `Invalid ${(err as any).path}: ${(err as any).value}`;
    error = new AppError(message, 400);
  }

  if ((err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Gửi response lỗi
  const statusCode = (error as AppError).statusCode || 500;
  const status = (error as AppError).status || 'error';

  res.status(statusCode).json({
    status,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  });
};

// Middleware để bắt các lỗi không xử lý được
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Middleware để xử lý các route không tồn tại
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
};




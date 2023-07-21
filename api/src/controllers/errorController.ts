import { Response, ErrorRequestHandler } from 'express';
import { Error as MongooseError } from 'mongoose';
import AppError from '../utils/AppError';

const handleCastErrorDB = (err: MongooseError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err: any) => {
  // const value = err.message.match(/(["'])(\\?.)*?\1/);
  const value = err.keyValue.name;

  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map(el => {
    return el.message;
  });
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 404);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 440);

const handleJWTExpiredError = () =>
  new AppError('Session Expired. Please login again!', 440);

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // console.log(err.message);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error: don't leak error details
  } else {
    //1)log the error
    console.error('ERROR 💥', err);

    //2) send generic message
    res.status(500).json({
      status: 'error',
      message: `Something went wrong`,
    });
  }
};

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;

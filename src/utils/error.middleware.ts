import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../utils/HttpException';
import { logger } from '../utils/logger';

type HttpStatusMap = {
  400: 'BadRequest',
  404: 'NotFound',
  409: 'Conflict',
  500: "InternalServerError"
}

const HttpStatusMap: HttpStatusMap = {
  400: 'BadRequest',
  404: 'NotFound',
  409: 'Conflict',
  500: 'InternalServerError'
}

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const statusMessage = HttpStatusMap[status]
    const message: string = error.message || 'Something went wrong';

    console.error(`\x1b[31m[${req.method}] ${req.path} >> StatusCode:: ${status}, Status:: ${statusMessage}, Message:: ${message}\x1b[0m`);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Status:: ${statusMessage}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

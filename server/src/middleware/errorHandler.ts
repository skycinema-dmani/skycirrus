import type { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  const message = err instanceof Error ? err.message : 'Internal server error';
  sendError(res, message, 500);
}

export function notFoundHandler(_req: Request, res: Response) {
  sendError(res, 'Route not found', 404);
}

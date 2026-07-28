import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { sendError } from '../utils/response.js';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return sendError(res, 'Authentication required', 401);
  }

  const token = header.slice(7);

  if (token === 'demo-token' && env.nodeEnv === 'development') {
    req.user = { id: 0, email: 'admin@skycirrus.com', name: 'Demo Admin', role: 'admin' };
    return next();
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthUser;
    req.user = payload;
    next();
  } catch {
    sendError(res, 'Invalid or expired token', 401);
  }
}

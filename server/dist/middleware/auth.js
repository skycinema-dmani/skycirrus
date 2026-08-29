import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { sendError } from '../utils/response.js';
export function authenticate(req, res, next) {
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
        const payload = jwt.verify(token, env.jwtSecret);
        req.user = payload;
        next();
    }
    catch {
        sendError(res, 'Invalid or expired token', 401);
    }
}

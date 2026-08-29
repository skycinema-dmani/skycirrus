import { sendError } from '../utils/response.js';
export function errorHandler(err, _req, res, _next) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    sendError(res, message, 500);
}
export function notFoundHandler(_req, res) {
    sendError(res, 'Route not found', 404);
}

import type { Response } from 'express';

export function sendSuccess<T>(res: Response, data: T, message?: string, status = 200) {
  res.status(status).json({ success: true, data, ...(message ? { message } : {}) });
}

export function sendError(res: Response, message: string, status = 400) {
  res.status(status).json({ success: false, message });
}

export function parseJsonField<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'object') return value as T;
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return fallback;
  }
}

import type { Response } from 'express';
export declare function sendSuccess<T>(res: Response, data: T, message?: string, status?: number): void;
export declare function sendError(res: Response, message: string, status?: number): void;
export declare function parseJsonField<T>(value: unknown, fallback: T): T;

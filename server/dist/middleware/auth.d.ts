import type { Request, Response, NextFunction } from 'express';
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
export declare function authenticate(req: Request, res: Response, next: NextFunction): void;

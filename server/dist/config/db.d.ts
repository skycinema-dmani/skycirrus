import mysql from 'mysql2/promise';
export declare const pool: mysql.Pool;
export declare function query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
export declare function queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>;
export declare function insert(sql: string, params?: unknown[]): Promise<number>;

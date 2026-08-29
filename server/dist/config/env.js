import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });
export const env = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'skycinema',
    },
    smtp: {
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        adminEmail: process.env.ADMIN_EMAIL || '',
    },
    instagramToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
};

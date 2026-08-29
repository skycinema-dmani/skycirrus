import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { queryOne } from '../config/db.js';
import { env } from '../config/env.js';
import { sendSuccess, sendError } from '../utils/response.js';

const router = Router();

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'editor';
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Email and password are required');
  }

  const user = await queryOne<UserRow>('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return sendError(res, 'Invalid credentials', 401);
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return sendError(res, 'Invalid credentials', 401);
  }

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });

  sendSuccess(res, { token, user: payload });
});

export default router;

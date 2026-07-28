import { Router } from 'express';
import { query, queryOne, insert } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { slugify } from '../utils/slugify.js';

interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
}

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await query<CategoryRow>('SELECT * FROM categories ORDER BY name ASC');
  sendSuccess(res, rows);
});

router.post('/', authenticate, async (req, res) => {
  const { name, description, image, parent_id } = req.body;
  if (!name) return sendError(res, 'Name is required');

  const slug = slugify(req.body.slug || name);
  const id = await insert(
    'INSERT INTO categories (name, slug, description, image, parent_id) VALUES (?, ?, ?, ?, ?)',
    [name, slug, description || null, image || null, parent_id ? Number(parent_id) : null]
  );

  const created = await queryOne<CategoryRow>('SELECT * FROM categories WHERE id = ?', [id]);
  sendSuccess(res, created, 'Category created', 201);
});

router.put('/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<CategoryRow>('SELECT * FROM categories WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Category not found', 404);

  const { name, description, image, parent_id } = req.body;
  const slug = req.body.slug ? slugify(req.body.slug) : existing.slug;

  await query(
    'UPDATE categories SET name=?, slug=?, description=?, image=?, parent_id=? WHERE id=?',
    [
      name ?? existing.name,
      slug,
      description ?? existing.description,
      image ?? existing.image,
      parent_id !== undefined ? (parent_id ? Number(parent_id) : null) : existing.parent_id,
      id,
    ]
  );

  const updated = await queryOne<CategoryRow>('SELECT * FROM categories WHERE id = ?', [id]);
  sendSuccess(res, updated);
});

router.delete('/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM categories WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Category not found', 404);

  await query('DELETE FROM categories WHERE id = ?', [id]);
  sendSuccess(res, null, 'Category deleted');
});

export default router;

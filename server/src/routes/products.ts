import { Router } from 'express';
import { query, queryOne, insert } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { upload, fileUrl } from '../middleware/upload.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { slugify } from '../utils/slugify.js';
import { mapProduct, type ProductRow } from '../utils/mappers.js';

const router = Router();

router.get('/', async (req, res) => {
  const { featured, limit, category, brand } = req.query;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (featured === 'true' || featured === '1') {
    conditions.push('p.featured = 1');
  }

  if (brand) {
    conditions.push('LOWER(p.brand) = LOWER(?)');
    params.push(String(brand));
  }

  if (category) {
    const cat = String(category);
    if (/^\d+$/.test(cat)) {
      conditions.push('p.category_id = ?');
      params.push(Number(cat));
    } else {
      conditions.push('c.slug = ?');
      params.push(cat);
    }
  }

  let sql = conditions.length ? conditions.join(' AND ') : '1=1';
  let limitClause = '';
  if (limit) {
    limitClause = ` LIMIT ${Math.min(Number(limit) || 10, 100)}`;
  }

  const rows = await query<ProductRow>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE ${sql}
     ORDER BY p.featured DESC, p.name ASC${limitClause}`,
    params
  );

  sendSuccess(res, rows.map(mapProduct));
});

router.get('/:slug', async (req, res) => {
  const row = await queryOne<ProductRow>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE p.slug = ?`,
    [req.params.slug]
  );

  if (!row) return sendError(res, 'Product not found', 404);
  sendSuccess(res, mapProduct(row));
});

router.post('/', authenticate, upload.single('image'), async (req, res) => {
  const { name, model, brand, category_id, description, specifications, featured, series } = req.body;

  if (!name || !model || !category_id || !description) {
    return sendError(res, 'Missing required fields');
  }

  const slug = slugify(req.body.slug || name);
  const image = req.file ? fileUrl(req.file.filename) : req.body.image;

  if (!image) return sendError(res, 'Product image is required');

  const newId = await insert(
    `INSERT INTO products (name, slug, model, brand, category_id, description, specifications, image, featured, series)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      slug,
      model,
      brand || 'JBL',
      Number(category_id),
      description,
      specifications ? JSON.stringify(typeof specifications === 'string' ? JSON.parse(specifications) : specifications) : null,
      image,
      featured === 'true' || featured === true || featured === '1' ? 1 : 0,
      series || null,
    ]
  );

  const created = await queryOne<ProductRow>(
    `SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON c.id = p.category_id WHERE p.id = ?`,
    [newId]
  );

  sendSuccess(res, mapProduct(created!), 'Product created', 201);
});

router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<ProductRow>('SELECT * FROM products WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Product not found', 404);

  const { name, model, brand, category_id, description, specifications, featured, series } = req.body;
  const slug = req.body.slug ? slugify(req.body.slug) : existing.slug;
  const image = req.file ? fileUrl(req.file.filename) : req.body.image || existing.image;

  await query(
    `UPDATE products SET name=?, slug=?, model=?, brand=?, category_id=?, description=?, specifications=?, image=?, featured=?, series=? WHERE id=?`,
    [
      name ?? existing.name,
      slug,
      model ?? existing.model,
      brand ?? existing.brand,
      category_id ? Number(category_id) : existing.category_id,
      description ?? existing.description,
      specifications
        ? JSON.stringify(typeof specifications === 'string' ? JSON.parse(specifications) : specifications)
        : existing.specifications,
      image,
      featured !== undefined ? (featured === 'true' || featured === true || featured === '1' ? 1 : 0) : existing.featured,
      series ?? existing.series,
      id,
    ]
  );

  const updated = await queryOne<ProductRow>(
    `SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON c.id = p.category_id WHERE p.id = ?`,
    [id]
  );

  sendSuccess(res, mapProduct(updated!));
});

router.delete('/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM products WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Product not found', 404);

  await query('DELETE FROM products WHERE id = ?', [id]);
  sendSuccess(res, null, 'Product deleted');
});

export default router;

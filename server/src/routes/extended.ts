import { Router } from 'express';
import { query, queryOne, insert } from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { upload, fileUrl } from '../middleware/upload.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { slugify } from '../utils/slugify.js';
import { mapProject, mapTestimonial, mapService, mapBlogPost, mapAppointment, type ProjectRow, type TestimonialRow, type ServiceRow, type BlogRow, type AppointmentRow } from '../utils/mappers.js';

const router = Router();

function parseJsonValue<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

router.get('/projects', async (req, res) => {
  const { featured, limit } = req.query;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (featured === 'true' || featured === '1') {
    conditions.push('featured = 1');
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const limitClause = limit ? ` LIMIT ${Math.min(Number(limit) || 10, 100)}` : '';

  const rows = await query<ProjectRow>(`SELECT * FROM projects ${where} ORDER BY featured DESC, created_at DESC${limitClause}`, params);
  const ids = rows.map((row) => row.id);
  let images: Array<{ project_id: number; image_url: string; caption?: string; sort_order: number }> = [];

  if (ids.length) {
    images = await query('SELECT project_id, image_url, caption, sort_order FROM project_images WHERE project_id IN (?) ORDER BY project_id, sort_order, id', [ids]);
  }

  const grouped = new Map<number, Array<{ id: number; project_id: number; image_url: string; caption?: string; sort_order: number }>>();
  for (const image of images) {
    const list = grouped.get(image.project_id) ?? [];
    list.push(image as never);
    grouped.set(image.project_id, list);
  }

  sendSuccess(res, rows.map((row) => mapProject(row, grouped.get(row.id) ?? [])));
});

router.get('/projects/:slug', async (req, res) => {
  const row = await queryOne<ProjectRow>('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
  if (!row) return sendError(res, 'Project not found', 404);

  const images = await query('SELECT id, project_id, image_url, caption, sort_order FROM project_images WHERE project_id = ? ORDER BY sort_order, id', [row.id]);
  sendSuccess(res, mapProject(row, images as Array<{ id: number; project_id: number; image_url: string; caption?: string; sort_order: number }>));
});

router.post('/projects', authenticate, upload.single('cover_image'), async (req, res) => {
  const { title, location, type, description, equipment, testimonial, client_name, featured, before_after } = req.body;
  if (!title || !location || !type || !description) return sendError(res, 'Missing required fields');

  const slug = slugify(req.body.slug || title);
  const cover_image = req.file ? fileUrl(req.file.filename) : req.body.cover_image;
  if (!cover_image) return sendError(res, 'Project cover image is required');

  const id = await insert(
    'INSERT INTO projects (title, slug, location, type, description, equipment, testimonial, client_name, featured, cover_image, before_after) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      title,
      slug,
      location,
      type,
      description,
      JSON.stringify(parseJsonValue(equipment, [])),
      testimonial || null,
      client_name || null,
      featured === 'true' || featured === true || featured === '1' ? 1 : 0,
      cover_image,
      before_after ? JSON.stringify(parseJsonValue(before_after, null)) : null,
    ]
  );

  const created = await queryOne<ProjectRow>('SELECT * FROM projects WHERE id = ?', [id]);
  sendSuccess(res, created ? mapProject(created) : null, 'Project created', 201);
});

router.put('/projects/:id', authenticate, upload.single('cover_image'), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<ProjectRow>('SELECT * FROM projects WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Project not found', 404);

  const { title, location, type, description, equipment, testimonial, client_name, featured, before_after } = req.body;
  const slug = req.body.slug ? slugify(req.body.slug) : existing.slug;
  const cover_image = req.file ? fileUrl(req.file.filename) : req.body.cover_image || existing.cover_image;

  await query(
    'UPDATE projects SET title=?, slug=?, location=?, type=?, description=?, equipment=?, testimonial=?, client_name=?, featured=?, cover_image=?, before_after=? WHERE id=?',
    [
      title ?? existing.title,
      slug,
      location ?? existing.location,
      type ?? existing.type,
      description ?? existing.description,
      equipment ? JSON.stringify(parseJsonValue(equipment, [])) : existing.equipment,
      testimonial ?? existing.testimonial,
      client_name ?? existing.client_name,
      featured !== undefined ? (featured === 'true' || featured === true || featured === '1' ? 1 : 0) : existing.featured,
      cover_image,
      before_after ? JSON.stringify(parseJsonValue(before_after, null)) : existing.before_after,
      id,
    ]
  );

  const updated = await queryOne<ProjectRow>('SELECT * FROM projects WHERE id = ?', [id]);
  sendSuccess(res, updated ? mapProject(updated) : null);
});

router.delete('/projects/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM projects WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Project not found', 404);

  await query('DELETE FROM projects WHERE id = ?', [id]);
  sendSuccess(res, null, 'Project deleted');
});

router.get('/testimonials', async (req, res) => {
  const { featured } = req.query;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (featured === 'true' || featured === '1') {
    conditions.push('featured = 1');
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const rows = await query<TestimonialRow>(`SELECT * FROM testimonials ${where} ORDER BY featured DESC, created_at DESC`, params);
  sendSuccess(res, rows.map(mapTestimonial));
});

router.post('/testimonials', authenticate, upload.single('client_photo'), async (req, res) => {
  const { client_name, rating, review, location, featured } = req.body;
  if (!client_name || !review) return sendError(res, 'Missing required fields');

  const client_photo = req.file ? fileUrl(req.file.filename) : req.body.client_photo;
  const id = await insert(
    'INSERT INTO testimonials (client_name, client_photo, rating, review, location, featured) VALUES (?, ?, ?, ?, ?, ?)',
    [client_name, client_photo || null, Number(rating) || 5, review, location || null, featured === 'true' || featured === true || featured === '1' ? 1 : 0]
  );

  const created = await queryOne<TestimonialRow>('SELECT * FROM testimonials WHERE id = ?', [id]);
  sendSuccess(res, created ? mapTestimonial(created) : null, 'Testimonial created', 201);
});

router.put('/testimonials/:id', authenticate, upload.single('client_photo'), async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<TestimonialRow>('SELECT * FROM testimonials WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Testimonial not found', 404);

  const { client_name, rating, review, location, featured } = req.body;
  const client_photo = req.file ? fileUrl(req.file.filename) : req.body.client_photo || existing.client_photo;

  await query(
    'UPDATE testimonials SET client_name=?, client_photo=?, rating=?, review=?, location=?, featured=? WHERE id=?',
    [client_name ?? existing.client_name, client_photo, rating ? Number(rating) : existing.rating, review ?? existing.review, location ?? existing.location, featured !== undefined ? (featured === 'true' || featured === true || featured === '1' ? 1 : 0) : existing.featured, id]
  );

  const updated = await queryOne<TestimonialRow>('SELECT * FROM testimonials WHERE id = ?', [id]);
  sendSuccess(res, updated ? mapTestimonial(updated) : null);
});

router.delete('/testimonials/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM testimonials WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Testimonial not found', 404);

  await query('DELETE FROM testimonials WHERE id = ?', [id]);
  sendSuccess(res, null, 'Testimonial deleted');
});

router.get('/services', async (_req, res) => {
  const rows = await query<ServiceRow>('SELECT * FROM services ORDER BY sort_order ASC, name ASC');
  sendSuccess(res, rows.map(mapService));
});

router.get('/services/:slug', async (req, res) => {
  const row = await queryOne<ServiceRow>('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
  if (!row) return sendError(res, 'Service not found', 404);
  sendSuccess(res, mapService(row));
});

router.post('/services', authenticate, async (req, res) => {
  const { name, description, content, image, icon } = req.body;
  if (!name || !description) return sendError(res, 'Missing required fields');

  const slug = slugify(req.body.slug || name);
  const id = await insert('INSERT INTO services (name, slug, description, content, image, icon) VALUES (?, ?, ?, ?, ?, ?)', [name, slug, description, content || null, image || null, icon || null]);
  const created = await queryOne<ServiceRow>('SELECT * FROM services WHERE id = ?', [id]);
  sendSuccess(res, created ? mapService(created) : null, 'Service created', 201);
});

router.put('/services/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<ServiceRow>('SELECT * FROM services WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Service not found', 404);

  const { name, description, content, image, icon } = req.body;
  const slug = req.body.slug ? slugify(req.body.slug) : existing.slug;

  await query('UPDATE services SET name=?, slug=?, description=?, content=?, image=?, icon=? WHERE id=?', [name ?? existing.name, slug, description ?? existing.description, content ?? existing.content, image ?? existing.image, icon ?? existing.icon, id]);
  const updated = await queryOne<ServiceRow>('SELECT * FROM services WHERE id = ?', [id]);
  sendSuccess(res, updated ? mapService(updated) : null);
});

router.delete('/services/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM services WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Service not found', 404);
  await query('DELETE FROM services WHERE id = ?', [id]);
  sendSuccess(res, null, 'Service deleted');
});

router.get('/blog', async (req, res) => {
  const { limit } = req.query;
  const limitClause = limit ? ` LIMIT ${Math.min(Number(limit) || 10, 100)}` : '';
  const rows = await query<BlogRow>(`SELECT * FROM blog_posts ORDER BY published_at DESC${limitClause}`);
  sendSuccess(res, rows.map(mapBlogPost));
});

router.get('/blog/:slug', async (req, res) => {
  const row = await queryOne<BlogRow>('SELECT * FROM blog_posts WHERE slug = ?', [req.params.slug]);
  if (!row) return sendError(res, 'Blog post not found', 404);
  sendSuccess(res, mapBlogPost(row));
});

router.post('/blog', authenticate, async (req, res) => {
  const { title, excerpt, content, cover_image, author, published_at, meta_title, meta_description } = req.body;
  if (!title || !excerpt || !content || !published_at) return sendError(res, 'Missing required fields');

  const slug = slugify(req.body.slug || title);
  const id = await insert('INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, published_at, meta_title, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, slug, excerpt, content, cover_image || null, author || null, published_at, meta_title || null, meta_description || null]);
  const created = await queryOne<BlogRow>('SELECT * FROM blog_posts WHERE id = ?', [id]);
  sendSuccess(res, created ? mapBlogPost(created) : null, 'Blog post created', 201);
});

router.put('/blog/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<BlogRow>('SELECT * FROM blog_posts WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Blog post not found', 404);

  const { title, excerpt, content, cover_image, author, published_at, meta_title, meta_description } = req.body;
  const slug = req.body.slug ? slugify(req.body.slug) : existing.slug;

  await query('UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, cover_image=?, author=?, published_at=?, meta_title=?, meta_description=? WHERE id=?', [title ?? existing.title, slug, excerpt ?? existing.excerpt, content ?? existing.content, cover_image ?? existing.cover_image, author ?? existing.author, published_at ?? existing.published_at, meta_title ?? existing.meta_title, meta_description ?? existing.meta_description, id]);
  const updated = await queryOne<BlogRow>('SELECT * FROM blog_posts WHERE id = ?', [id]);
  sendSuccess(res, updated ? mapBlogPost(updated) : null);
});

router.delete('/blog/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM blog_posts WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Blog post not found', 404);
  await query('DELETE FROM blog_posts WHERE id = ?', [id]);
  sendSuccess(res, null, 'Blog post deleted');
});

router.post('/appointments', async (req, res) => {
  const { name, phone, email, city, project_type, budget, message, preferred_date, location } = req.body;
  if (!name || !phone || !email || !city || !project_type || !budget || !preferred_date) return sendError(res, 'Missing required fields');

  const id = await insert('INSERT INTO appointments (name, phone, email, city, project_type, budget, message, preferred_date, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, phone, email, city, project_type, budget, message || null, preferred_date, location || null]);
  const created = await queryOne<AppointmentRow>('SELECT * FROM appointments WHERE id = ?', [id]);
  sendSuccess(res, created ? mapAppointment(created) : null, 'Appointment submitted', 201);
});

router.get('/appointments', authenticate, async (_req, res) => {
  const rows = await query<AppointmentRow>('SELECT * FROM appointments ORDER BY created_at DESC');
  sendSuccess(res, rows.map(mapAppointment));
});

router.put('/appointments/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne<AppointmentRow>('SELECT * FROM appointments WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Appointment not found', 404);

  const { status } = req.body;
  await query('UPDATE appointments SET status=? WHERE id=?', [status ?? existing.status, id]);
  const updated = await queryOne<AppointmentRow>('SELECT * FROM appointments WHERE id = ?', [id]);
  sendSuccess(res, updated ? mapAppointment(updated) : null);
});

router.post('/enquiries', async (req, res) => {
  const { name, phone, email, product_id, message } = req.body;
  if (!name || !phone || !email || !message) return sendError(res, 'Missing required fields');

  const id = await insert('INSERT INTO enquiries (name, phone, email, product_id, message) VALUES (?, ?, ?, ?, ?)', [name, phone, email, product_id ? Number(product_id) : null, message]);
  const created = await queryOne('SELECT * FROM enquiries WHERE id = ?', [id]);
  sendSuccess(res, created, 'Enquiry submitted', 201);
});

router.get('/enquiries', authenticate, async (_req, res) => {
  const rows = await query('SELECT * FROM enquiries ORDER BY created_at DESC');
  sendSuccess(res, rows);
});

router.put('/enquiries/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const existing = await queryOne('SELECT id FROM enquiries WHERE id = ?', [id]);
  if (!existing) return sendError(res, 'Enquiry not found', 404);

  const { status } = req.body;
  await query('UPDATE enquiries SET status=? WHERE id=?', [status ?? 'new', id]);
  const updated = await queryOne('SELECT * FROM enquiries WHERE id = ?', [id]);
  sendSuccess(res, updated);
});

router.get('/admin/dashboard', authenticate, async (_req, res) => {
  const [users] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM users');
  const [products] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM products');
  const [projects] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM projects');
  const [testimonials] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM testimonials');
  const [appointments] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM appointments');
  const [enquiries] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM enquiries');
  const [blogPosts] = await query<{ count: number }>('SELECT COUNT(*) AS count FROM blog_posts');

  sendSuccess(res, {
    users: users?.count || 0,
    products: products?.count || 0,
    projects: projects?.count || 0,
    testimonials: testimonials?.count || 0,
    appointments: appointments?.count || 0,
    enquiries: enquiries?.count || 0,
    blogPosts: blogPosts?.count || 0,
  });
});

router.get('/admin/settings', authenticate, async (_req, res) => {
  const rows = await query<{ setting_key: string; setting_value: string }>('SELECT setting_key, setting_value FROM site_settings');
  const settings = Object.fromEntries(rows.map((row) => [row.setting_key, row.setting_value]));
  sendSuccess(res, settings);
});

router.put('/admin/settings', authenticate, async (req, res) => {
  const updates = req.body as Record<string, string>;
  if (!updates || typeof updates !== 'object') return sendError(res, 'Invalid settings');

  for (const [key, value] of Object.entries(updates)) {
    await query('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)', [key, String(value)]);
  }

  sendSuccess(res, updates);
});

router.get('/instagram/feed', async (_req, res) => {
  sendSuccess(res, []);
});

export default router;

import { parseJsonField } from './response.js';

interface ProductRow {
  id: number;
  name: string;
  slug: string;
  model: string;
  brand: string;
  category_id: number;
  category_name?: string;
  description: string;
  specifications: unknown;
  image: string;
  gallery: unknown;
  featured: number | boolean;
  series: string | null;
  downloads: unknown;
}

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  equipment: unknown;
  testimonial: string | null;
  client_name: string | null;
  featured: number | boolean;
  cover_image: string;
  before_after: unknown;
}

interface TestimonialRow {
  id: number;
  client_name: string;
  client_photo: string | null;
  rating: number;
  review: string;
  location: string | null;
  featured: number | boolean;
}

interface ServiceRow {
  id: number;
  name: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  icon: string | null;
}

interface BlogRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string | null;
  published_at: string | Date;
  meta_title: string | null;
  meta_description: string | null;
}

interface AppointmentRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  budget: string;
  message: string | null;
  preferred_date: string | Date;
  location: string | null;
  status: string;
  created_at: string | Date;
}

export function mapProduct(row: ProductRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    model: row.model,
    brand: row.brand,
    category_id: row.category_id,
    category_name: row.category_name,
    description: row.description,
    specifications: parseJsonField<Record<string, string>>(row.specifications, {}),
    image: row.image,
    gallery: parseJsonField<string[] | undefined>(row.gallery, undefined),
    featured: Boolean(row.featured),
    series: row.series ?? undefined,
    downloads: parseJsonField<{ name: string; url: string }[] | undefined>(row.downloads, undefined),
  };
}

export function mapProject(row: ProjectRow, images: { id: number; project_id: number; image_url: string; caption?: string; sort_order: number }[] = []) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    type: row.type,
    description: row.description,
    equipment: parseJsonField<string[]>(row.equipment, []),
    testimonial: row.testimonial ?? undefined,
    client_name: row.client_name ?? undefined,
    featured: Boolean(row.featured),
    cover_image: row.cover_image,
    images: images.length ? images : undefined,
    before_after: parseJsonField<{ before: string; after: string } | undefined>(row.before_after, undefined),
  };
}

export function mapTestimonial(row: TestimonialRow) {
  return {
    id: row.id,
    client_name: row.client_name,
    client_photo: row.client_photo ?? undefined,
    rating: row.rating,
    review: row.review,
    location: row.location ?? undefined,
    featured: Boolean(row.featured),
  };
}

export function mapService(row: ServiceRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    content: row.content ?? undefined,
    image: row.image ?? undefined,
    icon: row.icon ?? undefined,
  };
}

export function mapBlogPost(row: BlogRow) {
  const published = row.published_at instanceof Date
    ? row.published_at.toISOString().slice(0, 10)
    : String(row.published_at).slice(0, 10);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    cover_image: row.cover_image ?? undefined,
    author: row.author ?? undefined,
    published_at: published,
    meta_title: row.meta_title ?? undefined,
    meta_description: row.meta_description ?? undefined,
  };
}

export function mapAppointment(row: AppointmentRow) {
  const preferred = row.preferred_date instanceof Date
    ? row.preferred_date.toISOString().slice(0, 10)
    : String(row.preferred_date).slice(0, 10);
  const created = row.created_at instanceof Date
    ? row.created_at.toISOString().slice(0, 10)
    : String(row.created_at).slice(0, 10);

  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    project_type: row.project_type,
    budget: row.budget,
    message: row.message ?? '',
    preferred_date: preferred,
    location: row.location ?? undefined,
    status: row.status,
    created_at: created,
  };
}

export type { ProductRow, ProjectRow, TestimonialRow, ServiceRow, BlogRow, AppointmentRow };

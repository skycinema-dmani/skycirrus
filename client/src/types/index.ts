export interface Product {
  id: number;
  name: string;
  slug: string;
  model: string;
  brand: string;
  category_id: number;
  category_name?: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  gallery?: string[];
  featured: boolean;
  series?: string;
  downloads?: { name: string; url: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  equipment: string[];
  testimonial?: string;
  client_name?: string;
  featured: boolean;
  cover_image: string;
  images?: ProjectImage[];
  before_after?: { before: string; after: string };
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  caption?: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_photo?: string;
  rating: number;
  review: string;
  location?: string;
  featured: boolean;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  icon?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author?: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
}

export interface Appointment {
  name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  budget: string;
  message: string;
  preferred_date: string;
  location?: string;
}

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  product_id?: number;
  message: string;
}

export interface SiteSettings {
  [key: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface DashboardStats {
  products: number;
  projects: number;
  appointments: number;
  enquiries: number;
  testimonials: number;
  blogPosts: number;
}

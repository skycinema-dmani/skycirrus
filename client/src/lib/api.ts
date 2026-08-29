import axios, { AxiosHeaders } from 'axios';

// Use environment variable or fallback to /api for local development
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('skycinema_token') : null;
  if (token) {
    const headers = config.headers ? new AxiosHeaders(config.headers) : new AxiosHeaders();
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('skycinema_token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

// Products
export const getProducts = (params?: Record<string, string | number>) =>
  api.get('/products', { params });
export const getProduct = (slug: string) => api.get(`/products/${slug}`);
export const createProduct = (data: FormData) =>
  api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProduct = (id: number, data: FormData) =>
  api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

// Categories
export const getCategories = () => api.get('/categories');
export const createCategory = (data: object) => api.post('/categories', data);
export const updateCategory = (id: number, data: object) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

// Projects
export const getProjects = (params?: Record<string, string | number>) =>
  api.get('/projects', { params });
export const getProject = (slug: string) => api.get(`/projects/${slug}`);
export const createProject = (data: FormData) =>
  api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProject = (id: number, data: FormData) =>
  api.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProject = (id: number) => api.delete(`/projects/${id}`);

// Testimonials
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data: FormData) =>
  api.post('/testimonials', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateTestimonial = (id: number, data: FormData) =>
  api.put(`/testimonials/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteTestimonial = (id: number) => api.delete(`/testimonials/${id}`);

// Services
export const getServices = () => api.get('/services');
export const getService = (slug: string) => api.get(`/services/${slug}`);

// Blog
export const getBlogPosts = (params?: Record<string, string | number>) =>
  api.get('/blog', { params });
export const getBlogPost = (slug: string) => api.get(`/blog/${slug}`);

// Appointments & Enquiries
export const createAppointment = (data: object) => api.post('/appointments', data);
export const createEnquiry = (data: object) => api.post('/enquiries', data);
export const getAppointments = () => api.get('/appointments');
export const updateAppointment = (id: number, data: object) => api.put(`/appointments/${id}`, data);

// Admin
export const getDashboardStats = () => api.get('/admin/dashboard');
export const getSiteSettings = () => api.get('/admin/settings');
export const updateSiteSettings = (data: object) => api.put('/admin/settings', data);

// Instagram (optional)
export const getInstagramFeed = () => api.get('/instagram/feed');

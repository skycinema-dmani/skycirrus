import { parseJsonField } from './response.js';
export function mapProduct(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        model: row.model,
        brand: row.brand,
        category_id: row.category_id,
        category_name: row.category_name,
        description: row.description,
        specifications: parseJsonField(row.specifications, {}),
        image: row.image,
        gallery: parseJsonField(row.gallery, undefined),
        featured: Boolean(row.featured),
        series: row.series ?? undefined,
        downloads: parseJsonField(row.downloads, undefined),
    };
}
export function mapProject(row, images = []) {
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        location: row.location,
        type: row.type,
        description: row.description,
        equipment: parseJsonField(row.equipment, []),
        testimonial: row.testimonial ?? undefined,
        client_name: row.client_name ?? undefined,
        featured: Boolean(row.featured),
        cover_image: row.cover_image,
        images: images.length ? images : undefined,
        before_after: parseJsonField(row.before_after, undefined),
    };
}
export function mapTestimonial(row) {
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
export function mapService(row) {
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
export function mapBlogPost(row) {
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
export function mapAppointment(row) {
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

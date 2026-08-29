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
export declare function mapProduct(row: ProductRow): {
    id: number;
    name: string;
    slug: string;
    model: string;
    brand: string;
    category_id: number;
    category_name: string | undefined;
    description: string;
    specifications: Record<string, string>;
    image: string;
    gallery: string[] | undefined;
    featured: boolean;
    series: string | undefined;
    downloads: {
        name: string;
        url: string;
    }[] | undefined;
};
export declare function mapProject(row: ProjectRow, images?: {
    id: number;
    project_id: number;
    image_url: string;
    caption?: string;
    sort_order: number;
}[]): {
    id: number;
    title: string;
    slug: string;
    location: string;
    type: string;
    description: string;
    equipment: string[];
    testimonial: string | undefined;
    client_name: string | undefined;
    featured: boolean;
    cover_image: string;
    images: {
        id: number;
        project_id: number;
        image_url: string;
        caption?: string;
        sort_order: number;
    }[] | undefined;
    before_after: {
        before: string;
        after: string;
    } | undefined;
};
export declare function mapTestimonial(row: TestimonialRow): {
    id: number;
    client_name: string;
    client_photo: string | undefined;
    rating: number;
    review: string;
    location: string | undefined;
    featured: boolean;
};
export declare function mapService(row: ServiceRow): {
    id: number;
    name: string;
    slug: string;
    description: string;
    content: string | undefined;
    image: string | undefined;
    icon: string | undefined;
};
export declare function mapBlogPost(row: BlogRow): {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | undefined;
    author: string | undefined;
    published_at: string;
    meta_title: string | undefined;
    meta_description: string | undefined;
};
export declare function mapAppointment(row: AppointmentRow): {
    id: number;
    name: string;
    phone: string;
    email: string;
    city: string;
    project_type: string;
    budget: string;
    message: string;
    preferred_date: string;
    location: string | undefined;
    status: string;
    created_at: string;
};
export type { ProductRow, ProjectRow, TestimonialRow, ServiceRow, BlogRow, AppointmentRow };

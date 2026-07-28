import { useState, useEffect } from 'react';
import { createProduct, deleteProduct, getCategories, getProducts } from '@/lib/api';
import type { Category, Product } from '@/types';

interface ProductFormState {
  name: string;
  model: string;
  brand: string;
  category_id: string;
  description: string;
  featured: boolean;
  image: File | null;
}

const initialFormState: ProductFormState = {
  name: '',
  model: '',
  brand: 'JBL',
  category_id: '',
  description: '',
  featured: false,
  image: null,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      setProducts(items);
    } catch {
      setProducts([]);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      setCategories(items);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    void loadProducts();
    void loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!form.name || !form.model || !form.category_id || !form.description || !form.image) {
      setFormError('Please complete all required fields and choose an image.');
      return;
    }

    const payload = new FormData();
    payload.append('name', form.name);
    payload.append('model', form.model);
    payload.append('brand', form.brand || 'JBL');
    payload.append('category_id', form.category_id);
    payload.append('description', form.description);
    payload.append('featured', String(form.featured));
    payload.append('image', form.image);

    setIsSubmitting(true);
    try {
      const res = await createProduct(payload);
      const createdProduct = res.data?.data;
      if (createdProduct) {
        setProducts((prev) => [createdProduct, ...prev]);
      }
      setForm(initialFormState);
      setShowForm(false);
      setFormSuccess('Product created successfully.');
      await loadProducts();
    } catch (err: unknown) {
      const message =
        typeof err === 'object' && err !== null && 'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Unable to create product.';
      setFormError(message ?? 'Unable to create product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setFormError('Unable to delete product.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-cream">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-gold text-obsidian text-sm uppercase tracking-widest hover:bg-gold-light transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <form className="glass rounded-lg p-6 mb-8 space-y-4" onSubmit={handleSubmit}>
          {formError && <p className="text-red-400 text-sm">{formError}</p>}
          {formSuccess && <p className="text-gold text-sm">{formSuccess}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="form-input"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <input
              className="form-input"
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
              required
            />
            <input
              className="form-input"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
            />
            <select
              className="form-input"
              value={form.category_id}
              onChange={(e) => setForm((prev) => ({ ...prev, category_id: e.target.value }))}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            required
          />
          <label className="flex items-center gap-3 text-sm text-cream/60">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-white/10 bg-transparent"
            />
            Featured product
          </label>
          <input
            type="file"
            accept="image/*"
            className="text-cream/50 text-sm"
            onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.files?.[0] ?? null }))}
            required
          />
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-gold text-obsidian text-sm uppercase tracking-widest disabled:opacity-60">
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      )}

      <div className="glass rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-cream/40 text-xs uppercase tracking-widest">
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Brand</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Featured</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                    <span className="text-cream">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-cream/50">{p.brand}</td>
                <td className="p-4 text-cream/50">{p.category_name}</td>
                <td className="p-4">{p.featured ? <span className="text-gold">Yes</span> : <span className="text-cream/30">No</span>}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-cream/50 hover:text-gold text-xs uppercase tracking-wider">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-cream/50 hover:text-red-400 text-xs uppercase tracking-wider">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

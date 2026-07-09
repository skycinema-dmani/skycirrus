import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProducts().then((res) => {
      if (res.data.data?.length) setProducts(res.data.data);
    }).catch(() => {});
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
    } catch { /* demo mode */ }
    setProducts(products.filter((p) => p.id !== id));
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
        <form className="glass rounded-lg p-6 mb-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <input className="form-input" placeholder="Product Name" />
            <input className="form-input" placeholder="Model" />
            <input className="form-input" placeholder="Brand" />
            <select className="form-input"><option>JBL</option></select>
          </div>
          <textarea className="form-input" rows={3} placeholder="Description" />
          <input type="file" accept="image/*" className="text-cream/50 text-sm" />
          <button type="submit" className="px-6 py-2 bg-gold text-obsidian text-sm uppercase tracking-widest">Save Product</button>
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

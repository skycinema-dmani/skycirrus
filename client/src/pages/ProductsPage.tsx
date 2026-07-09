import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import { getProducts } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const categoryFilter = searchParams.get('category') || '';
  const brandFilter = searchParams.get('brand') || '';

  useEffect(() => {
    const params: Record<string, string> = {};
    if (categoryFilter) params.category = categoryFilter;
    if (brandFilter) params.brand = brandFilter;

    getProducts(params)
      .then((res) => {
        if (res.data.data?.length) setProducts(res.data.data);
      })
      .catch(() => {
        let filtered = mockProducts;
        if (categoryFilter) {
          filtered = filtered.filter((p) =>
            p.category_name?.toLowerCase().replace(/\s+/g, '-') === categoryFilter ||
            mockProducts.some((mp) => mp.slug.includes(categoryFilter))
          );
        }
        if (brandFilter) filtered = filtered.filter((p) => p.brand.toLowerCase() === brandFilter.toLowerCase());
        setProducts(filtered.length ? filtered : mockProducts);
      });
  }, [categoryFilter, brandFilter]);

  return (
    <>
      <SEO
        title="Products"
        description="Explore premium JBL home theatre and Hi-Fi audio products. Authorized JBL Dealer — request a quote or book a private demo."
      />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Authorized JBL Dealer"
            title="Premium Products"
            description="Curated selection of the world's finest audio equipment. No prices — every system is bespoke."
          />

          <div className="flex flex-wrap gap-6 mb-12">
            <div>
              <label className="text-cream/30 text-xs uppercase tracking-widest block mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) searchParams.set('category', val);
                  else searchParams.delete('category');
                  setSearchParams(searchParams);
                }}
                className="form-input min-w-[200px]"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-cream/30 text-xs uppercase tracking-widest block mb-2">Brand</label>
              <select
                value={brandFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) searchParams.set('brand', val);
                  else searchParams.delete('brand');
                  setSearchParams(searchParams);
                }}
                className="form-input min-w-[200px]"
              >
                <option value="">All Brands</option>
                <option value="JBL">JBL</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group glass rounded-lg overflow-hidden hover:border-gold/20 transition-all duration-500"
              >
                <Link to={`/products/${product.slug}`}>
                  <div className="aspect-square overflow-hidden bg-charcoal">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold text-[10px] uppercase tracking-widest">{product.brand}</span>
                    {product.series && (
                      <span className="text-cream/30 text-[10px] uppercase tracking-widest">• {product.series}</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="text-cream/40 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <Button to={`/contact?product=${product.slug}`} variant="outline" size="sm" className="w-full">
                    Request Quote
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import { getProducts } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>(mockProducts.filter((p) => p.featured));

  useEffect(() => {
    getProducts({ featured: 'true', limit: 6 })
      .then((res) => {
        if (res.data.data?.length) setProducts(res.data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Authorized JBL Dealer"
          title="Featured JBL Products"
          description="Experience legendary JBL sound quality. Request a private demonstration at our experience center."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group glass rounded-lg overflow-hidden hover:border-gold/20 transition-all duration-500"
            >
              <Link to={`/products/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-charcoal">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold/90 text-obsidian text-[10px] uppercase tracking-widest font-medium">
                      JBL
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-6 md:p-8">
                <span className="text-gold/60 text-xs uppercase tracking-widest">
                  {product.model}
                </span>
                <h3 className="font-display text-2xl text-cream mt-2 mb-3 group-hover:text-gold transition-colors">
                  <Link to={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {product.specifications && (
                  <div className="space-y-1 mb-6">
                    {Object.entries(product.specifications)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-cream/30 uppercase tracking-wider">{key}</span>
                          <span className="text-cream/60">{value}</span>
                        </div>
                      ))}
                  </div>
                )}

                <Button
                  to={`/contact?product=${product.slug}`}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Request Quote
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button to="/products" variant="secondary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import { getProduct, getProducts } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | undefined>(
    mockProducts.find((p) => p.slug === slug)
  );
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState('');
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (slug) {
      getProduct(slug)
        .then((res) => {
          setProduct(res.data.data);
          setActiveImage(res.data.data.image);
        })
        .catch(() => {});
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      getProducts({ category: String(product.category_id), limit: 3 })
        .then((res) => setRelated(res.data.data?.filter((p: Product) => p.id !== product.id) || []))
        .catch(() => {
          setRelated(mockProducts.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 3));
        });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cream/50">Product not found</p>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        image={product.image}
        type="product"
      />

      <section className="pt-28 pb-16 section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div>
              <div
                className={`relative aspect-square bg-charcoal rounded-lg overflow-hidden mb-4 cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : ''}`}
                onClick={() => setZoomed(!zoomed)}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : ''}`}
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === img ? 'border-gold' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.3em]">{product.brand}</span>
              <h1 className="heading-display text-4xl md:text-5xl text-cream mt-2 mb-2">{product.name}</h1>
              <p className="text-cream/40 text-sm mb-8">Model: {product.model}</p>
              <p className="text-cream/60 leading-relaxed mb-8">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button to={`/contact?product=${product.slug}`} size="lg">Request Quote</Button>
                <Button to="/contact" variant="secondary" size="lg">Book Demo</Button>
              </div>

              {/* Specifications */}
              <div className="glass rounded-lg p-8 mb-8">
                <h2 className="font-display text-xl text-cream mb-6">Specifications</h2>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-cream/40 text-sm">{key}</span>
                      <span className="text-cream text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.downloads && product.downloads.length > 0 && (
                <div>
                  <h3 className="font-display text-lg text-cream mb-4">Downloads</h3>
                  <div className="space-y-2">
                    {product.downloads.map((dl) => (
                      <a
                        key={dl.name}
                        href={dl.url}
                        className="flex items-center gap-3 text-cream/50 hover:text-gold text-sm transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {dl.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-3xl text-cream mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p) => (
                  <Link key={p.id} to={`/products/${p.slug}`} className="group glass rounded-lg overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg text-cream group-hover:text-gold transition-colors">{p.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

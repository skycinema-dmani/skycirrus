import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CategoriesSection() {
  return (
    <section className="section-padding bg-charcoal/50">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Curated Collections"
          title="Featured Categories"
          description="Explore our carefully selected range of premium audio and cinema solutions."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-gold/30 rounded-lg transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-display text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <span className="inline-block mt-2 text-gold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

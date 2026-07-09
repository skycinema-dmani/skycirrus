import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO';
import SectionHeading from '@/components/ui/SectionHeading';
import { mockBlogPosts } from '@/lib/mockData';

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Journal"
        description="Insights on home theatre design, audio technology, and luxury living from the SkyCinema team."
      />

      <section className="pt-32 pb-16 section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Insights & Inspiration"
            title="Journal"
            description="Expert perspectives on home entertainment, acoustic design, and the art of luxury living."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-6">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <time className="text-gold/60 text-xs uppercase tracking-widest">
                    {new Date(post.published_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h3 className="font-display text-xl text-cream mt-2 mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-cream/50 text-sm line-clamp-2">{post.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

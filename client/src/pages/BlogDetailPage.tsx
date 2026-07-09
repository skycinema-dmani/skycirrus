import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import { mockBlogPosts } from '@/lib/mockData';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cream/50">Article not found</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.cover_image}
        type="article"
      />

      <article className="pt-32 pb-16">
        <div className="container-luxury max-w-3xl px-6 md:px-12">
          <Link to="/blog" className="text-gold/60 text-sm hover:text-gold transition-colors mb-8 inline-block">
            ← Back to Journal
          </Link>
          <time className="text-gold/60 text-xs uppercase tracking-widest block mb-4">
            {new Date(post.published_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="heading-display text-4xl md:text-5xl text-cream mb-8">{post.title}</h1>
          {post.cover_image && (
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-12">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-cream/60 text-lg leading-relaxed">{post.excerpt}</p>
            <p className="text-cream/50 leading-relaxed mt-6">
              At SkyCinema, we believe that exceptional home entertainment begins with understanding
              your space, your preferences, and your vision. Our team of certified specialists works
              closely with you to design systems that deliver reference-quality performance while
              seamlessly integrating into your lifestyle.
            </p>
            <p className="text-cream/50 leading-relaxed mt-4">
              Visit our experience centers in Krishnagiri or Salem to experience the difference
              that professional design and calibration makes. Book a private demonstration today.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5">
            <Button to="/contact">Book a Demo</Button>
          </div>
        </div>
      </article>
    </>
  );
}

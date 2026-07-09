import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Testimonial } from '@/types';
import { getTestimonials } from '@/lib/api';
import { mockTestimonials } from '@/lib/mockData';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-cream/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        if (res.data.data?.length) setTestimonials(res.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const t = testimonials[current];

  return (
    <section className="section-padding bg-charcoal/30">
      <div className="container-luxury max-w-4xl">
        <SectionHeading
          subtitle="Client Stories"
          title="Testimonials"
        />

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {t && (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  {t.client_photo ? (
                    <img
                      src={t.client_photo}
                      alt={t.client_name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-charcoal border-2 border-gold/30 flex items-center justify-center">
                      <span className="font-display text-gold text-xl">
                        {t.client_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <StarRating rating={t.rating} />

                <blockquote className="mt-8 mb-6">
                  <p className="font-display text-2xl md:text-3xl text-cream/80 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </blockquote>

                <div>
                  <p className="text-cream font-medium">{t.client_name}</p>
                  {t.location && (
                    <p className="text-cream/40 text-sm mt-1">{t.location}</p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <svg className="w-5 h-5 text-cream/30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-cream/30 text-xs">Google Review</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-gold w-8' : 'bg-cream/20 hover:bg-cream/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

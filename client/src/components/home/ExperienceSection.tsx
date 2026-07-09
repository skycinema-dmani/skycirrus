import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useAnimations';
import Button from '@/components/ui/Button';

export default function ExperienceSection() {
  const parallaxRef = useParallax(0.3);

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1920&q=80"
          alt="SkyCinema Experience Center"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>

      <div className="relative z-10 container-luxury mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-xs uppercase tracking-[0.3em] mb-6 block">
            Experience Center
          </span>
          <h2 className="heading-display text-4xl md:text-6xl lg:text-7xl text-cream mb-6">
            Don't Just Listen.
            <br />
            <span className="text-gradient-gold italic">Experience It.</span>
          </h2>
          <p className="text-cream/60 text-lg max-w-xl mx-auto mb-10 font-light">
            Book a private demonstration inside our experience center and
            discover what premium sound truly feels like.
          </p>
          <Button to="/contact" size="lg">
            Reserve Appointment
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

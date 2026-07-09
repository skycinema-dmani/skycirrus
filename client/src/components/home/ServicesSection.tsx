import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          subtitle="What We Do"
          title="Our Services"
          description="Comprehensive solutions from concept to calibration, designed for discerning clients."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group block bg-obsidian p-8 md:p-10 h-full hover:bg-charcoal transition-colors duration-500"
              >
                <span className="text-gold/40 font-display text-4xl mb-6 block group-hover:text-gold/60 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors">
                  {service.name}
                </h3>
                <p className="text-cream/40 text-sm leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-block mt-6 text-gold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

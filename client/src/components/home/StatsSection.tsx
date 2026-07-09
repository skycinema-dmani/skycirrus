import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';

export default function StatsSection() {
  return (
    <section className="relative py-20 md:py-28 border-y border-white/5">
      <div className="absolute inset-0 luxury-gradient opacity-50" />
      <div className="container-luxury mx-auto px-6 md:px-12 lg:px-24 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <span className="block font-display text-4xl md:text-5xl lg:text-6xl text-gold mb-2">
                {stat.value}
              </span>
              <span className="text-cream/40 text-xs uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

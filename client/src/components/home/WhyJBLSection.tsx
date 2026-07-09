import { motion } from 'framer-motion';
import { JBL_WHY } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WhyJBLSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian" />
      </div>

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              subtitle="Authorized JBL Dealer"
              title="Why JBL"
              description="For over 75 years, JBL has defined the standard for professional audio. From concert halls to cinema screens, JBL sound is the reference."
              align="left"
              className="mb-12"
            />

            <div className="space-y-8">
              {JBL_WHY.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                    <span className="text-gold font-display text-lg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231d799?w=800&q=80"
                alt="JBL Premium Audio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass px-8 py-6 rounded-lg">
              <span className="block font-display text-3xl text-gold">JBL</span>
              <span className="text-cream/50 text-xs uppercase tracking-widest">
                Authorized Dealer
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

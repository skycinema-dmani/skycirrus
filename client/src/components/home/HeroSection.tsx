import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-home-theater-with-large-screen-39878-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-gold text-xs uppercase tracking-[0.4em] mb-8 font-sans">
            Authorized JBL Dealer
          </span>

          <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream mb-8 leading-[1.1]">
            Experience Cinema.
            <br />
            <span className="text-gradient-gold italic">Inside Your Home.</span>
          </h1>

          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Premium Home Theatre, Hi-Fi Audio and Smart Home Automation
            designed for luxury living.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" size="lg">
              Book Private Demo
            </Button>
            <Button to="/projects" variant="secondary" size="lg">
              Explore Projects
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-cream/30 text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

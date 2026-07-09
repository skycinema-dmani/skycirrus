import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'glass-dark py-4' : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container-luxury mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link to="/" className="group flex flex-col">
          <span className="font-display text-2xl md:text-3xl text-cream tracking-wide group-hover:text-gold transition-colors duration-500">
            Sky<span className="text-gold">Cinema</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 hidden md:block">
            Authorized JBL Dealer
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 hover:text-gold ${
                location.pathname === link.path ? 'text-gold' : 'text-cream/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" size="sm">
            Book Demo
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark border-t border-white/5"
          >
            <nav className="flex flex-col px-6 py-8 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-display text-cream/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button to="/contact" className="mt-4">
                Book Private Demo
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
